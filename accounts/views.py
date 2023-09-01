from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer
from .models import EmailConfirmationToken
from .utils import send_confirmation_mail
from django.contrib.auth import authenticate, login, logout

# class ListCreateUsers(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserRegisterSerializer

#     def get_permissions(self):
#         return [permissions.IsAdminUser() if self.request.method == "GET" else permissions.AllowAny()]

class RegisterUser(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny,]



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
