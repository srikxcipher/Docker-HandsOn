from django.http import HttpResponse
from django.shortcuts import render

'''
def home(request):
    return HttpResponse("🎉 Hello from Dockerized Django!")
'''
def home(request):
    return render(request, 'home.html')