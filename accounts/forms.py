from django import forms
from django.contrib.auth.models import User

class ResetPasswordForm(forms.ModelForm):
    confirm_password = forms.CharField()

    class Meta:
        model = User
        fields = ("password", "confirm_password",)