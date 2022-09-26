from django.contrib import admin
from django.urls import path, include
import api.urls
from api.views import ImagesViewSet, ImagesUserListViewSet, ImageUserListViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(api.urls)),
    path('images/', ImagesViewSet.as_view(), name="List of all images"),
    path('users/<int:pk>/images/',
         ImagesUserListViewSet.as_view(), name="List of user images"),
    path('users/<int:pk>/images/<int:id_image>/',
         ImageUserListViewSet.as_view(), name="User specific image")
]
