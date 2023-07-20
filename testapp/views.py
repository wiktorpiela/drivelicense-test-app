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
    b = "PODSTAWOWY"
    s = "SPECJALISTYCZNY"
    criteria = [
            #type, score, sample size
            (b, "3", 10), 
            (b, "2", 6), 
            (b, "1", 4), 
            (s, "3", 6),
            (s, "2", 4),
            (s, "1", 2),
        ]

    def get_queryset(self, categoryName):
        chosen_indexes = [] 

        for type, score, sampleSize in self.criteria:

            q_list = [Q(type__icontains = type), Q(score__icontains = score), Q(quest_category__category__icontains = categoryName)] #questionModelForeignkeyfield__fieldnameFromrelatedModel__icontains

            currentIdxs = list(
                Question.objects.filter(reduce(operator.and_, q_list)).values_list("pk", flat=True)
            )

            randomIdxs = random.sample(currentIdxs, sampleSize)
            chosen_indexes.append(randomIdxs)

        chosen_indexes = [item for sublist in chosen_indexes for item in sublist]
        queryset = Question.objects.filter(pk__in = chosen_indexes).order_by("type")
        
        return queryset
    
    def get(self, request, categoryName, format=None):
        exam_questions = self.get_queryset(categoryName)
        serializer = QuestionSerializer(exam_questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


