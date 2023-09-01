from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("list-register-user/", views.ListCreateUsers.as_view(), name="listCreayeUsers"),

]