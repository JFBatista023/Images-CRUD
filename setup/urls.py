from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from api.views import ImagesViewSet
import api.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include(api.urls)),
    path('images/', ImagesViewSet.as_view(), name="List of all images"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
