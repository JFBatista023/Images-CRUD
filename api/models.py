from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    name = models.CharField(max_length=20)
    photo = models.ImageField(upload_to="%Y/%m/%d")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name
