from django.contrib import admin

from api.models import Image


class Images(admin.ModelAdmin):
    list_display = ('id', 'name', 'photo', 'user_id')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    list_per_page = 20


admin.site.register(Image, Images)
