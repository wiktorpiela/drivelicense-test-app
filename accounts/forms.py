from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class ResetPasswordForm(forms.ModelForm):
    # password = forms.CharField(widget = forms.PasswordInput(attrs={
    #     "placeholder": "Create new password",
    #     "class": "form-control"
    # }))

    confirm_password = forms.CharField()

    class Meta:
        model = User
        fields = ("password", "confirm_password",)

    # def __init__(self, *args, **kwatgs):
    #     super(ResetPasswordForm, self).__init__(*args, **kwatgs)

    #     for field in self.fields:
    #         self.fields[field].widget.attrs["class"] = "form-control"

    def clean(self):
        cleaned_data = super(ResetPasswordForm, self).clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        print(password)
        print(confirm_password)

        if password != confirm_password:
            raise forms.ValidationError(
                "Hasła nie są identyczne!"
            )
        
        validate_password(password)