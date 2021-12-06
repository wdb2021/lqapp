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
    redirect_uri = quote("https://lingqin.com.cn/settings/acwing/web/receive_code/") #quote替换特殊字符
    scope = "userinfo"
    state = get_state()

    cache.set(state, True, 600) #有效期10分钟
    apply_code_url = "https://www.acwing.com/third_party/api/oauth2/web/authorize/"
    return JsonResponse({
        'result': "success",
        'apply_code_url': apply_code_url + \
                "?appid=%s&redirect_url=%s&scope=%s&state=%s" % (appid, redirect_uri, scope, state)
    })

