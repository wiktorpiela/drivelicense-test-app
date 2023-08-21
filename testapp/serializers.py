from rest_framework import serializers
from .  import models

class QuestionSerializer(serializers.ModelSerializer):
    quest_category = serializers.StringRelatedField()
    legal_source = serializers.StringRelatedField()
    abc_answers = serializers.StringRelatedField()
    quest_purpose = serializers.PrimaryKeyRelatedField(queryset=models.QuestionPurpose.objects.all())
    media = serializers.StringRelatedField()
    quest_txt = serializers.StringRelatedField()
    safety_relation = serializers.PrimaryKeyRelatedField(queryset=models.QuestionSafety.objects.all())
    subject = serializers.PrimaryKeyRelatedField(queryset=models.QuestionSubject.objects.all())
    
    class Meta:
        model = models.Question
        fields = ("id", "quest_txt", "abc_answers", "quest_correct_answer", 
                  "media", "score", "type", "subject", "legal_source", "safety_relation", "quest_category", "quest_txt", 
                  "quest_purpose",)