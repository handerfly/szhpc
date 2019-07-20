from django.shortcuts import render

# Create your views here.
def index(request):
    context = {}
    context['title'] = "运行状态"
    return render(request, 'status/index.html', context)