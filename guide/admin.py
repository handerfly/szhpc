from django.contrib import admin
from guide.models import *
# Register your models here.
@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ['id','content']