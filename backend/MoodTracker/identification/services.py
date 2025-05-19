from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse

class AuthService:

    @staticmethod
    def generate_tokens_and_set_cookie(user):
        refresh = RefreshToken.for_user(user)

        response = JsonResponse({
            'access': str(refresh.access_token)
        })

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=False,  # Установите True в продакшене
            samesite=None # Установите 'Lax' в продакшене
        )

        return response