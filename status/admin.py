from django.contrib import admin
from .models import Quota
# Register your models here.
@admin.register(Quota)
class QuotaAdmin(admin.ModelAdmin):
    list_display = [
    "username",
    "uid",
    "realbytes",
    "softbytes",
    "hardbytes",
    "realinodes",
    "softinodes",
    "hardinodes",
    "grace",
    "collect_time"]


admin.site.site_header = '深圳气象局高性能网后台管理'
admin.site.site_title = '深圳气象局高性能'