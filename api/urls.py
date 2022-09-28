from django.urls import path, include
from api.views import UsersViewSet
import api.urls_images

urlpatterns = [
    path('', UsersViewSet.as_view(), name='List of Users'),
    path('<int:pk>/', include(api.urls_images), name=""),
]
