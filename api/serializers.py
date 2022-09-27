from rest_framework import serializers
from api.models import Image
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from drf_extra_fields.fields import Base64ImageField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name']

    def validate_password(self, password):
        return make_password(password)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ImagesUsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['name', 'photo']
