from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer #UserProfileSerializer
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .utils import send_reset_password_email
from .forms import ResetPasswordForm
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from testapp.permissions import IsOwner
# from .models import UserProfile

class RegisterUser(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny,]

# class UserProfileData(generics.RetrieveAPIView):
#     permission_classes = [IsOwner]
#     queryset = UserProfile.objects.all()
#     serializer_class = UserProfileSerializer
    
def activate(request, uidb64, token): 
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return render(request, "activation_success.html", {"current_domain":settings.CURRENT_DOMAIN})
    else:
        return render(request, "activation_failed.html")

class GetToken(APIView):

    def post(self, request, format=None):
        username = request.data["email"]
        password = request.data["password"]

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token":f"{token}"}, status=status.HTTP_200_OK)
        
        else:
            #user = User.objects.get(username=username)
            user = User.objects.filter(username=username).exists()

            if not user :
                return Response({"error": "This user doens't exist."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "This password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
            
class ForgotPassword(APIView):

    def post(self, request, format=None):
        email = request.data["email"]

        if User.objects.filter(username=email).exists():
            user = User.objects.get(username=email)
            send_reset_password_email(request,
                                      "Reset hasła",
                                      "reset_password_email.html",
                                      user,
                                      email)
            return Response(status=status.HTTP_200_OK)
        
        else:
            return Response({"error":"Taki użytkownik nie istnieje!"}, status=status.HTTP_400_BAD_REQUEST)

def reset_password_validate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        request.session["uid"] = uid
        return render(request, "reset_password.html")
    else:
        return render(request, "reset_password_failed_page.html")

def reset_password(request):  
    if request.method == "POST":
        form = ResetPasswordForm(request.POST)
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password==confirm_password:
            try:
                validate_password(password)
            except ValidationError as exceptions:
                return render(request, "reset_password.html", {"passError":exceptions,
                                                               "length": len(list(exceptions))})
            else:
                if form.is_valid():
                    uid = request.session.get("uid")
                    user = User.objects.get(pk = uid)
                    user.set_password(password)
                    user.save()
                    #return HttpResponse("success")
                    return render(request, "reset_password_success.html")
                
                else:
                    form = ResetPasswordForm()
        else:
            errorMsg = "Hasła nie są identyczne!"
            return render(request, "reset_password.html", {"errorMsg":errorMsg})
        
    context = {
        "form":form
    }

    return render(request, "reset_password.html", context)
    

            



