from django.urls import path
from api.views import UserViewSet, ImagesUserListViewSet, ImageUploadViewSet, ImageUserListViewSet, ShowImageViewSet


urlpatterns = [
    path('', UserViewSet.as_view(), name='User'),
    path('images/', ImagesUserListViewSet.as_view(),
         name="List of user images"),
    path('images/<int:id_image>/',
         ImageUserListViewSet.as_view(), name="User specific image"),
    path('images/uploadfiles/',
         ImageUploadViewSet.as_view(), name="Upload files"),
    path('images/<int:id_image>/file/',
         ShowImageViewSet.as_view(), name="Show Image"),
]
