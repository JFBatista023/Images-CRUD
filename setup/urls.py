from django.contrib import admin
from django.urls import path, include
import api.urls
from api.views import ImageUploadViewSet, ImagesUserListViewSet, ImageUserListViewSet, ImagesViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(api.urls)),
    path('images/', ImagesViewSet.as_view(), name="List of all images"),
]
