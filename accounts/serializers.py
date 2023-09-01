from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
        
class UserRegisterSerializer(serializers.ModelSerializer):
 
    email = serializers.EmailField(
        required = True,
        validators=[UniqueValidator(
            queryset = User.objects.all(),
            message = "A user with that email already exists."
            )]
        )
    
    class Meta:
        model = User
        fields = ("id", "username", "email", "password",)
        extra_kwargs = {
            "password": {"write_only":True},
        }

    def create(self, data):
        username = data.get("username")   
        email = data.get("email")
        password = data.get("password")
        
        try:
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        else:
            user = User.objects.create_user(username=username,email=email,password=password) 
            return user