from django.contrib import admin
from .models import TypeOfMood


@admin.register(TypeOfMood)
class TypeOfMoodAdmin(admin.ModelAdmin):
    list_display = ('mood',)