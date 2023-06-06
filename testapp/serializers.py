# from rest_framework import serializers
# from .  import models

# class QuestionSerializer(serializers.ModelSerializer):
#     quest_category = serializers.PrimaryKeyRelatedField(queryset=models.QuestionCategory.objects.all())
#     quest_correct_answer = serializers.PrimaryKeyRelatedField(queryset=models.QuestionCorrectAnswer.objects.all())
#     legal_source = serializers.PrimaryKeyRelatedField(queryset=models.QuestionLegalSource.objects.all())
#     abc_answers = serializers.PrimaryKeyRelatedField(queryset=models.QuestionPossibleAnswers.objects.all())
#     quest_purpose = serializers.PrimaryKeyRelatedField(queryset=models.QuestionPurpose.objects.all())
#     media = serializers.PrimaryKeyRelatedField(queryset=models.QuestionMedia.objects.all())
#     quest_txt = serializers.PrimaryKeyRelatedField(queryset=models.QuestionText.objects.all())
#     safety_relation = serializers.PrimaryKeyRelatedField(queryset=models.QuestionSafety.objects.all())
#     score = serializers.PrimaryKeyRelatedField(queryset=models.QuestionScores.objects.all())
#     subject = serializers.PrimaryKeyRelatedField(queryset=models.QuestionSubject.objects.all())
#     type = serializers.PrimaryKeyRelatedField(queryset=models.QuestionType.objects.all())
    
#     class Meta:
#         model = models.Question
#         fields = ("id", "quest_txt", "abc_answers", "quest_correct_answer", 
#                   "media", "score", "type", "subject", "legal_source", "safety_relation", "quest_category", "quest_txt", 
#                   "quest_purpose",)
