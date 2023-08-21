from django.urls import path
from . import views

app_name = "testapp"

urlpatterns = [
    path("exam-questions/<str:categoryName>/", views.GetExamQuestions.as_view(), name="examQuestions"),
    path("categories", views.GetAllLicenseCategories.as_view(), name="licenseCategories"),
    ]