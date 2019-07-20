from django.contrib import admin
from resource.models import *
# Register your models here.
@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = ['title']

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['id', 'content']

#
admin.site.site_header = '深圳气象局高性能网后台管理'
admin.site.site_title = '深圳气象局高性能'