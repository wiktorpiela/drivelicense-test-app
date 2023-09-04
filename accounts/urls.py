from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("register-user/", views.RegisterUser.as_view(), name="registerUser"),
    path("activate-user/<uidb64>/<token>/", views.activate, name="activateUser"),


]