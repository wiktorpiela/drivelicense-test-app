from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token
from uuid import uuid4

# class UserProfile(models.Model):
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE
#     )
#     # pic = models.ImageField(upload_to="drivelicense-user-images/", default="test.jpg")
#     stop_notification = models.BooleanField(default=False)

#     @receiver(post_save, sender=User)
#     def create_user_profile(sender, instance, created, **kwargs):
#         if created:
#             UserProfile.objects.create(
#                 user = instance
#             )
            
#     @receiver(post_save, sender=User)
#     def save_user_profile(sender, instance, **kwargs):
#         instance.userprofile.save()

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


