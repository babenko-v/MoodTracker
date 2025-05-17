from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone

class Client(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)

    date_joined = models.DateTimeField(default=timezone.now)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'client'
        ordering = ['id', ]

    def __str__(self):
        return self.email
