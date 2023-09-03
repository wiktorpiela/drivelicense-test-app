from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from .models import EmailConfirmationToken
from django.contrib.auth import authenticate, login, logout
from django.core.mail import EmailMessage
from django.conf import settings
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from rest_framework.decorators import api_view

# class ListCreateUsers(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserRegisterSerializer

#     def get_permissions(self):
#         return [permissions.IsAdminUser() if self.request.method == "GET" else permissions.AllowAny()]

class RegisterUser(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny,]

@api_view(["GET"])
def activate(request, uidb64, token): 
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User._default_manager.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    def post(self, request, format=None):
        data = request.data
        username = data.get("username", None)
        password = data.get("password", None)

        user = authenticate(username=username, password=password)

        print(user)

        if user is not None:
            if user.is_active:
                login(request, user)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SendEmailConfirmationToken(APIView):

    def post(self, request, format=None):
        user = request.user
        token = EmailConfirmationToken.objects.create(user=user)
        send_confirmation_mail(emial=user.email, token_id=token.pk, user_id=user.pk)
        return Response(data=None, status=status.HTTP_201_CREATED)
