from django.urls import path

from api.views import UsersViewSet


urlpatterns = [
    path('', UsersViewSet.as_view(), name='List of Users'),
    path('<int:pk>/', UsersViewSet.as_view(), name='User')
]
