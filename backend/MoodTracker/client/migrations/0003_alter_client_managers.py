# Generated by Django 5.2.1 on 2025-05-18 22:05

import client.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("client", "0002_alter_client_table"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="client",
            managers=[
                ("objects", client.models.CustomUserManager()),
            ],
        ),
    ]
