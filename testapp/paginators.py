from rest_framework.pagination import PageNumberPagination

class ExamResultPaginator(PageNumberPagination):
    page_size = 3