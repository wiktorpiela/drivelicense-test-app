from rest_framework import generics
from rest_framework.views import APIView
from .serializers import QuestionSerializer
from .models import Question
import random
from rest_framework.response import Response

class GetExamQuestions(APIView):

    serializer_class = QuestionSerializer

    def get_queryset(self):
        all_questions = Question.objects.all()
        max_index = len(all_questions)
        indexes_chosen = random.sample(range(max_index+1), 30)
        return Question.objects.filter(pk__in = indexes_chosen)


    def get(self, request, format=None):
        exam_questions = self.get_queryset()
        serializer = QuestionSerializer(exam_questions, many=True)
        return Response(serializer.data)


