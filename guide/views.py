from django.shortcuts import render
from .models import Guide
# Create your views here.
def index(request):
    guide_obj = Guide.objects.all().first()
    context = {}
    context['guide_obj'] = guide_obj
    context['title'] = "使用说明"
    return render(request, 'guide/index.html', context)
