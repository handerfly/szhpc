"""yongjie URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

app_name = 'status'
urlpatterns = [
    path('', views.index, name='status_index'),

    path('memory_chart', views.memory_chart, name='memory_chart'),
    path('cpu_chart', views.cpu_chart, name='cpu_chart'),
    path("group_cpu_chart", views.group_cpu_chart, name="group_cpu_chart"),
    path("group_memory_chart", views.group_memory_chart, name="group_memory_chart"),

    path("get_selected_option", views.get_selected_option, name="get_selected_option"),
    path("storage_chart", views.storage_chart, name="storage_chart"),
    path("storage_table", views.storage_table, name="storage_table"),
    path("cpu_history", views.cpu_history, name="cpu_history"),
]
