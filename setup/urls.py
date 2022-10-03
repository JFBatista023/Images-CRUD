from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import ImagesViewSet, MyTokenObtainPairView
import api.urls
import api.urls_auth

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', include(api.urls)),
    path('auth/', include(api.urls_auth)),
    path('images/', ImagesViewSet.as_view(), name="List of all images"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
