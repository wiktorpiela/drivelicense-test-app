from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class RegisterUser(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny,]

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

class CustomGetToken(APIView):

    def post(self, request, format=None):
        username = request.data["username"]
        password = request.data["password"]

        user = authenticate(username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token":f"{token}"})
        
        else:
            #user = User.objects.get(username=username)
            user = User.objects.filter(username=username).exists()

            if not user :
                return Response({"email": "This user doens't exist."})
        
            else:
                return Response({"password": "This password is incorrect."})


            



