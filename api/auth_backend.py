from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response


class EmailBackend(ModelBackend):
    def authenticate(self, request, email, password):
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return Response("User not registered", status=status.HTTP_404_NOT_FOUND)
