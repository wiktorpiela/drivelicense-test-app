from rest_framework.response import Response
from rest_framework import status, mixins, generics, permissions, filters
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserRegisterSerializer

class ListCreateUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def get_permissions(self):
        return [permissions.IsAdminUser() if self.request.method == "GET" else permissions.AllowAny()]