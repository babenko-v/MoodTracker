from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from django.http import JsonResponse
from rest_framework import status
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from .services import AuthService
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)
        if user is not None:

            return AuthService.generate_tokens_and_set_cookie(user)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class CustomTokenRefreshView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class   = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token')
        print(refresh_token)
        if not refresh_token:
            print(1)
            return JsonResponse(
                {'detail': 'Refresh token not provided'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = self.get_serializer(data={'refresh': refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except (TokenError, InvalidToken):

            return JsonResponse(
                {'detail': 'Refresh token expired or invalid'},
                status=status.HTTP_401_UNAUTHORIZED
            )


        access_token = serializer.validated_data['access']
        return JsonResponse({'access': access_token}, status=status.HTTP_200_OK)


class UserRegistrationView(GenericAPIView):
    serializer_class = UserRegisterSerializer  # ← ОБОВ’ЯЗКОВО
    permission_classes = [AllowAny]


    def post(self, request):
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                return AuthService.generate_tokens_and_set_cookie(user)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):

        response = Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        return response
