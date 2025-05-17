# views.py
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .models import Mood
from .serializers import MoodSerializer

class MoodViewSet(ModelViewSet):
    serializer_class = MoodSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    def get_queryset(self):
        # базовий qs — всі записи
        qs = Mood.objects.all()

        # спробуємо зчитати параметр week_offset
        week_offset = self.request.query_params.get('week_offset')
        if week_offset is not None:
            try:
                offset = int(week_offset)
                # застосуємо наш кастомний метод week(offset)
                qs = qs.week(offset)
            except ValueError:
                # якщо не вдалося привести до int — нічого не робимо
                pass

        return qs
