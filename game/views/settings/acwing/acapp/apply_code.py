from django.http import JsonResponse
from urllib.parse import quote
from random import randint
from django.core.cache import cache

def get_state():
    res = ""
    for i in range(8):
        res +=str(randint(0,9))
    return res

def apply_code(request):
    appid = "500"
    redirect_uri = quote("https://lingqin.com.cn/settings/acwing/acapp/receive_code/") #quote替换特殊字符
    scope = "userinfo"
    state = get_state()

    cache.set(state, True, 600) #有效期10分钟
    return JsonResponse({
        'result': "success",
        'apppid': appid,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'state': state,
    })

