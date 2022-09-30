from django.urls import path
from api.views import UserAuthenticationLoginView, UserAuthenticationLogoutView, UserAuthenticationRegisterView


urlpatterns = [
    path("login/",
         UserAuthenticationLoginView.as_view(), name="Login"),
    path("logout/", UserAuthenticationLogoutView.as_view(), name="Logout"),
    path("register/", UserAuthenticationRegisterView.as_view(), name="Register"),
]
