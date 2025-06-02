# models.py
from datetime import datetime, date, time, timedelta
from client.models import Client

from django.db import models
from django.utils import timezone


class TypeOfMood(models.Model):
    mood = models.CharField(max_length=120)

    def __str__(self):
        return self.mood


class MoodQuerySet(models.QuerySet):
    def week(self, offset: int = 0):

        today: date = timezone.localdate()

        start_of_week: date = today - timedelta(days=today.weekday()) - timedelta(weeks=offset)
        end_of_week: date = start_of_week + timedelta(days=7)


        tz = timezone.get_current_timezone()
        start_dt = timezone.make_aware(datetime.combine(start_of_week, time.min), tz)
        end_dt = timezone.make_aware(datetime.combine(end_of_week, time.min), tz)

        return self.filter(date__gte=start_dt, date__lt=end_dt)


class Mood(models.Model):
    mood_day = models.ForeignKey(
        TypeOfMood,
        related_name='mood_records',
        on_delete=models.PROTECT
    )

    user_id = models.ForeignKey(
        Client,
        related_name='user',
        on_delete=models.PROTECT
    )
    date = models.CharField(max_length=120)
    note = models.TextField(max_length=300, blank=True, null=True)

    objects = MoodQuerySet.as_manager()

    def __str__(self):
        return f'{self.mood_day} - {self.date}'
