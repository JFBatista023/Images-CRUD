from rest_framework import generics, status, views, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import FileResponse
from api.models import Image
from api.serializers import ImageSerializer, ImagesUsersListSerializer, UserSerializer
import shutil
from pathlib import Path
import os


class UsersViewSet(views.APIView):

    """Methods for Users/"""

    def get(self, request, *args, **kwargs):
        queryset = get_list_or_404(User)
        serializer_class = UserSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    def patch(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        serializer = UserSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk, *args, **kwargs):
        id = pk
        queryset = get_object_or_404(User, pk=id)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)


class UserViewSet(generics.ListAPIView):
    """A User"""

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


class ImagesUserListViewSet(views.APIView):
    """List of all user images"""

    def get(self, request, *args, **kwargs):
        queryset = get_list_or_404(Image, user_id=self.kwargs['pk'])
        serializer_class = ImagesUsersListSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)


class ImageUserListViewSet(generics.RetrieveDestroyAPIView):
    """User specific image"""

    def get(self, request, *args, **kwargs):
        queryset = get_object_or_404(
            Image, user_id=self.kwargs['pk'], id=self.kwargs['id_image'])
        serializer_class = ImagesUsersListSerializer(queryset)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        queryset = get_object_or_404(
            Image, user_id=self.kwargs['pk'], id=self.kwargs['id_image'])
        queryset.delete()
        return Response(status=status.HTTP_200_OK)


class ShowImageViewSet(views.APIView):
    """Showing a Image"""

    def get(self, request, *args, **kwargs):
        path = os.getcwd()
        image = Image.objects.get(id=self.kwargs['id_image'])
        with open(f"{path}/media/{str(self.kwargs['pk'])}/{image.name}", 'rb') as file:
            return FileResponse(file, status.HTTP_200_OK)


class ImageUploadViewSet(views.APIView):
    """Upload Images"""
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        request.data.update(
            {'user_id': self.kwargs['pk']})
        print(request.data)
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            up_file = request.FILES['photo']
            path = os.getcwd()
            Path(
                f"{path}/media/{str(self.kwargs['pk'])}/").mkdir(parents=True, exist_ok=True)

            pk = str(self.kwargs['pk'])
            destination = open(f'{path}/media/{pk}/' +
                               request.data['name'], 'wb+')
            for chunk in up_file.chunks():
                destination.write(chunk)
            destination.close()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
