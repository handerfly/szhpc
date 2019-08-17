"""szhpc URL Configuration

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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from hpc import views as hpc
urlpatterns = [
    path('', hpc.index, name='index'),
    # 后台
    path('admin/', admin.site.urls),
    path('ckeditor', include('ckeditor_uploader.urls')),

    # 联系我们
    path('contact/', include('contact.urls')),
    # 常用下载
    path('download/', include('download.urls')),
    # 使用说明
    path('guide/', include('guide.urls')),
    # 平台概况
	path('hpc/', include('hpc.urls')),
    # 资源
    path('resource/', include('resource.urls')),
    # 运行状态
    path('status/', include('status.urls')),

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
