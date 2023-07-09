from rest_framework import generics
from rest_framework.views import APIView
from .serializers import QuestionSerializer
from .models import Question
import random
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
import operator
from functools import reduce

class GetExamQuestions(APIView):
    criteria = [
            #type, score, sample size
            ("P", "3", 10),
            ("P", "2", 6),
            ("P", "1", 4),
            ("S", "3", 6),
            ("S", "2", 4),
            ("S", "1", 2),
        ]

    def get_queryset(self):
        chosen_indexes = [] 

        for type, score, sampleSize in self.criteria:

            q_list = [Q(type__icontains = type), Q(score__icontains = score), Q(quest_category__category__icontains = "B")] #questionModelForeignkeyfield__fieldnameFromrelatedModel__icontains

            currentIdxs = list(
                Question.objects.filter(reduce(operator.and_, q_list)).values_list("pk", flat=True)
            )

            randomIdxs = random.sample(currentIdxs, sampleSize)
            chosen_indexes.append(randomIdxs)

        chosen_indexes = [item for sublist in chosen_indexes for item in sublist]
        queryset = Question.objects.filter(pk__in = chosen_indexes).order_by("type")

        return queryset
    
    def get(self, request, format=None):
        exam_questions = self.get_queryset()
        serializer = QuestionSerializer(exam_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


