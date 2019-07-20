from django.contrib import admin
from hpc.models import *
# Register your models here.
@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ['id', 'content']


#
admin.site.site_header = '深圳气象局高性能网后台管理-平台简介'
admin.site.site_title = '深圳气象局高性能-平台简介'