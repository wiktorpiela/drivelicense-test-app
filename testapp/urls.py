from django.urls import path
from . import views

urlpatterns = [
    path("exam-questions/<str:categoryName>/", views.GetExamQuestions.as_view(), name="examQuestions"),
    
    ]