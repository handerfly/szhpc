from django.contrib import admin
from  download.models import *
# Register your models here.

@admin.register(Download)
class DownloadAdmin(admin.ModelAdmin):
    list_display = ['content']