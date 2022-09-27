from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


from api.views import ImageUploadViewSet, ImageUserListViewSet, ImagesUserListViewSet, ShowImageViewSet, UsersViewSet, UserViewSet


urlpatterns = [
    path('', UsersViewSet.as_view(), name='List of Users'),
    path('<int:pk>/', UserViewSet.as_view(), name='User'),
    path('<int:pk>/images/', ImagesUserListViewSet.as_view(),
         name="List of user images"),
    path('<int:pk>/images/<int:id_image>/',
         ImageUserListViewSet.as_view(), name="User specific image"),
    path('<int:pk>/images/<str:name_image>/',
         ImageUploadViewSet.as_view(), name="Upload files"),
    path('<int:pk>/images/<int:id_image>/file/',
         ShowImageViewSet.as_view(), name="Show Image"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
