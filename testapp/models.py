from django.db import models

class QuestionCategory(models.Model):
    category= models.CharField(max_length=50)

class QuestionLegalSource(models.Model):
    legal = models.TextField()

class QuestionPossibleAnswers(models.Model):
    A = models.TextField()
    B = models.TextField()
    C = models.TextField()

class QuestionPurpose(models.Model):
    purpose = models.TextField()

class QuestionMedia(models.Model):
    path = models.CharField(max_length=255)

class QuestionText(models.Model):
    content = models.TextField()

class QuestionSafety(models.Model):
    desc = models.TextField()

class QuestionSubject(models.Model):
    quest_subject = models.CharField(max_length=50)

class Question(models.Model):
            
    possible_answers = [
        ("T", "Tak"),
        ("N", "Nie"),
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
    ]

    scores = [
        (1, "1"),
        (2, "2"),
        (3, "3"),
    ]

    types = [
        ("P", "PODSTAWOWY"),
        ("S", "SPECJALISTYCZNY")
    ]

    quest_name = models.CharField(max_length=20)
    quest_num = models.IntegerField()
    quest_correct_answer = models.CharField(max_length=1, choices=possible_answers)
    score = models.IntegerField(choices=scores)
    type = models.CharField(max_length=1, choices=types)
    abc_answers = models.ForeignKey(QuestionPossibleAnswers, on_delete=models.DO_NOTHING, related_name="abc_answers", blank=True, null=True)
    legal_source = models.ForeignKey(QuestionLegalSource, on_delete=models.DO_NOTHING, related_name="legal_source")
    media = models.ForeignKey(QuestionMedia, on_delete=models.DO_NOTHING, related_name="media", blank=True, null=True)
    quest_category = models.ForeignKey(QuestionCategory, on_delete=models.DO_NOTHING, related_name="quest_category")
    quest_purpose = models.ForeignKey(QuestionPurpose, on_delete=models.DO_NOTHING, related_name="quest_purpose")
    quest_txt = models.ForeignKey(QuestionText, on_delete=models.DO_NOTHING, related_name="quest_txt")
    safety_relation = models.ForeignKey(QuestionSafety, on_delete=models.DO_NOTHING, related_name="safety")
    subject = models.ForeignKey(QuestionSubject, on_delete=models.DO_NOTHING, related_name="subject")

    def __str__(self) -> str:
        return f"question: {self.quest_txt[:100]}"