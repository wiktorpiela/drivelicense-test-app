from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = "accounts"

urlpatterns = [
    path("register-user/", views.RegisterUser.as_view(), name="registerUser"),
    path("get-account-data/", views.UserProfileData.as_view(), name="getAccountData"),
    path("activate-user/<uidb64>/<token>/", views.activate, name="activateUser"),
    path('get-token/', views.GetToken.as_view(), name="getToken"),
    path('forgot-password/', views.ForgotPassword.as_view(), name="forgotPassword"),
    path('reset-password-validate/<uidb64>/<token>/', views.reset_password_validate, name="resetPasswordValidate"),
    path('reset-password/', views.reset_password, name="resetPassword"),
]