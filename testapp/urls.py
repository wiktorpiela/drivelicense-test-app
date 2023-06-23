from django.urls import path
from . import views

urlpatterns = [
    path("exam-questions/", views.GetExamQuestions.as_view(), name="examQuestions"),
    
    ]