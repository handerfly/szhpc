from django.shortcuts import render
from .models import Resource
# Create your views here.
def index(request):
    resource_obj = Resource.objects.all().first()
    context = {}
    context['resource_obj'] = resource_obj
    context['title'] = "资源环境"
    return render(request, 'resource/index.html', context)