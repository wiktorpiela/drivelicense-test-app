from django.urls import path
from . import views

app_name = "testapp"

urlpatterns = [
    path("exam-questions/<str:categoryName>/", views.GetExamQuestions.as_view(), name="examQuestions"),
    path("categories/", views.GetAllLicenseCategories.as_view(), name="licenseCategories"),
    path("test-media/<str:mediaType>/", views.TestMedia.as_view(), name="testMedia"),
    path("store-exam-result/", views.StoreExamResult.as_view(), name="examResult"),
    path("list-exam-result/", views.ListExamResult.as_view(), name="listExamResult"),
    path("delete-exam-result/<int:pk>/", views.DeleteExamResult.as_view(), name="deleteExamResult"),
    path("exam-result-details/<int:mainId>/", views.ExamDetails.as_view(), name="examResultDetails"),
    ]