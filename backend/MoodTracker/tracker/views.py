from datetime import datetime
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet

from .models import Mood
from .serializers import MoodSerializer

class MoodViewSet(ModelViewSet):
    serializer_class       = MoodSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes     = [IsAuthenticated]


    def get_queryset(self):
        qs = Mood.objects.filter(user_id=self.request.user)
        week_offset = self.request.query_params.get("week_offset")
        if week_offset is not None:
            try:
                qs = qs.week(int(week_offset))
            except ValueError:
                pass
        return qs

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)

    @action(detail=False, methods=["get"], url_path="by-date")
    def get_by_date(self, request):
        date_str = request.query_params.get("date")
        if not date_str:
            return Response(
                {"detail": "Параметр `date` обов’язковий у форматі YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            return Response(
                {"detail": "Невірний формат дати. Використовуйте YYYY-MM-DD"},
                status=status.HTTP_400_BAD_REQUEST
            )


        mood = (
            self.get_queryset()
            .filter(date__startswith=date_str)
            .first()
        )

        if not mood:
            return Response(
                {"detail": "Запис настрою на цю дату не знайдено"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(mood)
        return Response(serializer.data)
