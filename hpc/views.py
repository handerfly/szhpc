from django.shortcuts import render
from .models import Links,About

# Create your views here.
def index(request):
    links = Links.objects.all()
    about = About.objects.all().first()
    context = {}
    context['title'] = "平台概况"
    context['links'] = links
    context['about'] = about

    return render(request, 'hpc/index.html', context)

def about(request):
    context = {}
    context['title'] = "平台概况"
    return render(request, 'hpc/about.html',context)

def news(request):
    return render(request, 'hpc/news.html')