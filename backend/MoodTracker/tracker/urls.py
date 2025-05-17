from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import MoodViewSet

# Создание роутера и регистрация ViewSet
router = DefaultRouter()
router.register(r'mood', MoodViewSet, basename='mood')

# Маршруты приложения
urlpatterns = [
    path('', include(router.urls)),  # Включаем маршруты роутера
]