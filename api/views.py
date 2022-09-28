import os
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import FileResponse
from api.models import Image
from api.serializers import ImageSerializer, ImagesUsersListSerializer, UserSerializer, UserUpdatesSerializer


class UsersViewSet(views.APIView):

    """Methods for Users/"""

    # @permission_classes([IsAdminUser])
    def get(self, request, *args, **kwargs):
        queryset = get_list_or_404(User)
        serializer_class = UserSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UserUpdatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # @permission_classes([IsAuthenticated, IsAdminUser])
    def put(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserUpdatesSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    # @permission_classes([IsAuthenticated, IsAdminUser])
    def patch(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserUpdatesSerializer(
            queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    # @permission_classes([IsAuthenticated, IsAdminUser])
    def delete(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)


class UserViewSet(generics.ListAPIView):
    """A User"""

    # @permission_classes([IsAuthenticated, IsAdminUser])
    def get(self, request, pk, *args, **kwargs):
        id = pk
        if id is not None:
            queryset = get_object_or_404(User, pk=id)
            serializer_class = UserSerializer(queryset)
            return Response(serializer_class.data, status=status.HTTP_200_OK)


class ImagesViewSet(generics.ListAPIView):
    """List of all images"""

    queryset = get_list_or_404(Image)
    serializer_class = ImageSerializer
    # permission_classes = [IsAdminUser]


class ImagesUserListViewSet(views.APIView):
    """List of all user images"""

    # permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        queryset = get_list_or_404(Image, user_id=self.kwargs['pk'])
        serializer_class = ImagesUsersListSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class ImageUserListViewSet(generics.RetrieveDestroyAPIView):
    """User specific image"""

    # permission_classes = [IsAuthenticated, IsAdminUser]

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

    # permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        image = Image.objects.get(id=self.kwargs['id_image'])
        image_path = image.photo.path
        file = open(f"{image_path}", 'rb')
        return FileResponse(file, status.HTTP_200_OK)


class ImageUploadViewSet(views.APIView):
    """Upload Images"""
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        images = Image.objects.filter(user_id=self.kwargs['pk'])
        for image in images:
            if image.name == request.data['name']:
                return Response("Duplicate name", status=status.HTTP_400_BAD_REQUEST)

        if str(request.data['photo']).split('.')[1] != 'png' and str(request.data['photo']).split('.')[1] != 'jpg':
            return Response("Invalid file extension. Only .jpg and .png files.", status=status.HTTP_400_BAD_REQUEST)

        request.data.update(
            {'user_id': self.kwargs['pk']})
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
