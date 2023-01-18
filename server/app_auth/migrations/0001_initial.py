# Generated by Django 4.1.3 on 2023-01-18 15:52

import app_auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                ("nickname", models.CharField(max_length=128, verbose_name="nickname")),
                (
                    "email",
                    models.EmailField(
                        max_length=254, unique=True, verbose_name="email address"
                    ),
                ),
                (
                    "password",
                    models.CharField(
                        max_length=128,
                        null=True,
                        validators=[app_auth.validators.password_validator],
                        verbose_name="password",
                    ),
                ),
                (
                    "account_provider",
                    models.CharField(
                        choices=[("google", "Google")], max_length=128, null=True
                    ),
                ),
                ("account_subject", models.CharField(max_length=128, null=True)),
            ],
            options={
                "ordering": ["id"],
            },
        ),
    ]
