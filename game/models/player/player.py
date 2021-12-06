from django.db import models
from django.contrib.auth.models import User


class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE) # 删除user时， player一起删掉
    photo = models.URLField(max_length=256, blank=True)
    openid = models.CharField(default="", max_length=32, blank=True, null=True);

    def __str__(self):
        return str(self.user)
