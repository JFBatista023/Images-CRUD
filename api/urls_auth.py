from django.urls import path
from api.views import UserAuthenticationRegisterView


urlpatterns = [
    path("register/", UserAuthenticationRegisterView.as_view(), name="Register"),
]
