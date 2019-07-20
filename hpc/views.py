from django.shortcuts import render

# Create your views here.
def index(request):
    context = {}
    context['title'] = "平台概况"
    return render(request, 'hpc/index.html', context)

def about(request):
    context = {}
    context['title'] = "平台概况"
    return render(request, 'hpc/about.html',context)

def news(request):
    return render(request, 'hpc/news.html')