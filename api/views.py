from rest_framework import viewsets, generics, status, views, permissions, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from api.models import Image
from api.serializers import ImageSerializer, ImagesUsersListSerializer, UserSerializer


# class UsersListViewSet(generics.GenericAPIView, mixins.ListModelMixin):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)


# class UsersCreateViewSet(generics.GenericAPIView, mixins.CreateModelMixin):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


class UsersViewSet(views.APIView):

    """Methods for Users/"""

    def get(self, request, pk=None):
        id = pk
        if id is not None:
            queryset = User.objects.get(id=id)
            serializer_class = UserSerializer(queryset)
            return Response(serializer_class.data, status=status.HTTP_200_OK)

        queryset = User.objects.all()
        serializer_class = UserSerializer(queryset, many=True)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        id = pk
        queryset = User.objects.get(pk=id)
        serializer = UserSerializer(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        id = pk
        queryset = User.objects.get(pk=id)
        serializer = UserSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        id = pk
        queryset = User.objects.get(pk=id)
        queryset.delete()
        return Response(status=status.HTTP_200_OK)


class ImagesViewSet(generics.ListAPIView):
    """List of all images"""

    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class ImagesUserListViewSet(generics.ListAPIView):
    """List of all user images"""

    def get_queryset(self):
        queryset = Image.objects.filter(user_id=self.kwargs['pk'])
        return queryset

    serializer_class = ImagesUsersListSerializer


class ImageUserListViewSet(generics.RetrieveDestroyAPIView):
    """User specific image"""

    def get(self, request, *args, **kwargs):
        queryset = Image.objects.filter(
            user_id=self.kwargs['pk']).filter(id=self.kwargs['id_image'])
        serializer_class = ImagesUsersListSerializer(queryset)
        return Response(serializer_class.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        queryset = Image.objects.filter(
            user_id=self.kwargs['pk']).filter(id=self.kwargs['id_image'])
        queryset.delete()
        return Response(status=status.HTTP_200_OK)
