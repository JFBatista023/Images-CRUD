import os
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import FileResponse
from api.models import Image
from api.serializers import ImageSerializer, ImagesUsersListSerializer, UserSerializer, UserUpdatesSerializer, EmailTokenObtainSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainSerializer


class UsersViewSet(views.APIView):

    """Methods for Users/"""

    def get(self, request, *args, **kwargs):
        queryset = get_list_or_404(User)
        serializer_class = UserSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def put(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserUpdatesSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    def patch(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserUpdatesSerializer(
            queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)


class UserAuthenticationRegisterView(views.APIView):
    def post(self, request, *args, **kwargs):
        user_email = User.objects.filter(email=request.data['email'])
        user_username = User.objects.filter(username=request.data['username'])
        if user_email or user_username:
            return Response("Credentials already registered", status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = UserUpdatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("User created successfully", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(generics.ListAPIView):
    """A User"""

    def get(self, request, pk, *args, **kwargs):
        id = pk
        if id:
            queryset = get_object_or_404(User, pk=id)
            serializer_class = UserSerializer(queryset)
            return Response(serializer_class.data, status=status.HTTP_200_OK)


class ImagesViewSet(generics.ListAPIView):
    """List of all images"""

    queryset = get_list_or_404(Image)
    serializer_class = ImageSerializer


class ImagesUserListViewSet(views.APIView):
    """List of all user images"""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = Image.objects.filter(user_id=self.kwargs['pk'])
        if not queryset:
            return Response([], status=status.HTTP_200_OK)
        serializer_class = ImagesUsersListSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class ImageUserListViewSet(generics.RetrieveDestroyAPIView):
    """User specific image"""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = get_object_or_404(
            Image, user_id=self.kwargs['pk'], id=self.kwargs['id_image'])
        serializer_class = ImagesUsersListSerializer(queryset)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        queryset = get_object_or_404(
            Image, user_id=self.kwargs['pk'], id=self.kwargs['id_image'])
        queryset.delete()
        os.remove(queryset.photo.path)
        return Response(status=status.HTTP_200_OK)


class ShowImageViewSet(views.APIView):
    """Showing a Image"""

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        image = Image.objects.get(id=self.kwargs['id_image'])
        image_path = image.photo.path
        file = open(f"{image_path}", 'rb')
        return FileResponse(file, status.HTTP_200_OK)


class ImageUploadViewSet(views.APIView):
    """Upload Images"""
    parser_classes = [MultiPartParser]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        images = Image.objects.filter(user_id=self.kwargs['pk'])
        for image in images:
            if image.name.lower() == str(request.data['name']).lower():
                return Response("Duplicate name", status=status.HTTP_400_BAD_REQUEST)

        if str(request.data['photo']).split('.')[1] != 'png' and str(request.data['photo']).split('.')[1] != 'jpg':
            return Response("Invalid file extension. Only .jpg and .png files.", status=status.HTTP_400_BAD_REQUEST)

        request.data.update(
            {'user_id': self.kwargs['pk']})
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
