from django.shortcuts import render
from .models import Download
# Create your views here.
def index(request):
    download_obj = Download.objects.all().first()
    context = {}
    context['download_obj'] = download_obj
    context['title'] = "常用下载"
    return render(request, 'download/index.html', context)