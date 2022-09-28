from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView
from api.views import ImagesViewSet
import api.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(api.urls)),
    path('token/', TokenObtainPairView.as_view(), name="Get Token"),
    path('token/refresh/', TokenRefreshSlidingView.as_view(), name="Refresh Token"),
    path('images/', ImagesViewSet.as_view(), name="List of all images"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
