from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.shortcuts import render

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


# class LoginUser(APIView):
#     def post(self, request, format=None):
#         data = request.data
#         username = data.get("username", None)
#         password = data.get("password", None)

#         user = authenticate(username=username, password=password)

#         print(user)

#         if user is not None:
#             if user.is_active:
#                 login(request, user)
#                 return Response(status=status.HTTP_200_OK)
#             else:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#         else:
#             return Response(status=status.HTTP_404_NOT_FOUND)

