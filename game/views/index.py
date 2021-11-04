#在web端调用，返回html文件
from django.shortcuts import render

def index(request):
    return render(request, "multiends/web.html")

