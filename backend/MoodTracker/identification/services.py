# services.py
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse
from django.conf import settings

class AuthService:

    @staticmethod
    def generate_tokens_and_set_cookie(user):
        refresh = RefreshToken.for_user(user)
        access  = refresh.access_token
        print(refresh)

        response = JsonResponse({
            'access': str(access)
        })

        response.set_cookie(
            key='refresh_token',
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite='None',
            path='/',
            domain='localhost'
        )
        return response
