from django.shortcuts import render
from .models import Contact
# Create your views here.
def index(request):
    contact_obj = Contact.objects.all().first()
    context = {}
    context['contact_obj'] = contact_obj
    context['title'] = "联系我们"
    return render(request, 'contact/index.html', context)