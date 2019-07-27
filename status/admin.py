from django.contrib import admin
from .models import Quota
# Register your models here.
@admin.register(Quota)
class QuotaAdmin(admin.ModelAdmin):
    list_display = [
    "qtype",
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
