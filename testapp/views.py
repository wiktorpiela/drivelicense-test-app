from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from .serializers import QuestionSerializer, MainResultSerializer, DetailResultSerializer
from .models import Question, QuestionCategory, QuestionMedia, MainResult
import random
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
import operator
from functools import reduce
from .locked_media import locked_media_names

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

            q_list = [Q(type__icontains = type), Q(score__icontains = score), Q(quest_category__category__icontains = categoryName), ~Q(media__path__in=locked_media_names)]
            #questionModelForeignkeyfield__fieldnameFromrelatedModel__icontains

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

class GetAllLicenseCategories(APIView):

    def get(self, format=None):
        category_list = []
        all_categories = QuestionCategory.objects.all().values_list("category", flat=True)

        for item in all_categories:
            item = item.split(",")
            for subitem in item:
                if subitem not in category_list and not any(map(str.isdigit, subitem)):
                    category_list.append(subitem)

        category_list = sorted(category_list)
        return Response({"categories": category_list}, status=status.HTTP_200_OK)
    
class TestMedia(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request, mediaType, format=None):
        if mediaType=="img":
            media_names = QuestionMedia.objects.filter(path__contains=".jpg")
        elif mediaType=="video":
            media_names = QuestionMedia.objects.filter(Q(path__contains=".wmv") | Q(path__contains=".mp4"))

        media_names = media_names.values_list("path", flat=True)

        return Response({"media_names":media_names}, status=status.HTTP_200_OK)
    
class StoreExamResult(APIView):

    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        isCreated = MainResult.objects.filter(user=self.request.user, exam_date=request.data.get("exam_date")).exists()

        if isCreated:
            return Response({"error":"Egzamin już został zapisany!"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = MainResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)

            quest_details = request.data.get("detailsArray")
            main_result = MainResult.objects.get(pk=serializer.data.get("id"))

            for detail in quest_details:
                sub_serializer = DetailResultSerializer(data=detail)
                if sub_serializer.is_valid():
                    sub_serializer.save(main_result=main_result)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class StoredExamResult(mixins.ListModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):

    permission_classes = [IsAuthenticated]
    queryset = MainResult.objects.all()
    serializer_class = MainResultSerializer

    def get_queryset(self):
        queryset = MainResult.objects.filter(user=self.request.user)
        return queryset

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# class StoredExamResult(generics.ListAPIView):

#     permission_classes = [IsAuthenticated]
#     queryset = MainResult.objects.all()
#     serializer_class = MainResultSerializer

#     def get_queryset(self):
#         queryset = MainResult.objects.filter(user=self.request.user)
#         return queryset


