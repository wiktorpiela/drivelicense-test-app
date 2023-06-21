from django.urls import path
from . import views

urlpatterns = [
    path("all-questions/", views.ListQuestions.as_view(), name="allQuestions"),

]