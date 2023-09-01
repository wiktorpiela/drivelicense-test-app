from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = "accounts"

urlpatterns = [
    path("register-user/", views.RegisterUser.as_view(), name="registerUser"),
    path("login-user/", views.LoginUser.as_view(), name="loginUser"),
    path("send-email-confirmation/", views.SendEmailConfirmationToken.as_view(), name="sendEmailConfirmation"),

]