from django.db import models
from django.contrib.auth.models import User


class Image(models.Model):
    name = models.CharField(max_length=20)
    photo = models.ImageField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.photo.name = f'{self.user_id.id}/{self.name}.%s' % self.photo.name.split('.')[
                1]
        return super(Image, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
