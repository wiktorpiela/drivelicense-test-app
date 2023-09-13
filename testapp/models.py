from django.db import models
from django.contrib.auth.models import User

class QuestionCategory(models.Model):
    category= models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.category

class QuestionLegalSource(models.Model):
    legal = models.TextField()

    def __str__(self) -> str:
        return self.legal

class QuestionPossibleAnswers(models.Model):
    A = models.TextField()
    B = models.TextField()
    C = models.TextField()

    def __str__(self) -> str:
        if self.A != "":
            return f"A. {self.A} - B. {self.B} - C. {self.C}"
        else:
            return "YN"

class QuestionPurpose(models.Model):
    purpose = models.TextField()

class QuestionMedia(models.Model):
    path = models.CharField(max_length=100)

    def __str__(self):
        return self.path

class QuestionText(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.content

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
    type = models.CharField(max_length=20, choices=types)
    abc_answers = models.ForeignKey(QuestionPossibleAnswers, on_delete=models.DO_NOTHING, related_name="abc_answers") #answer description if exists
    legal_source = models.ForeignKey(QuestionLegalSource, on_delete=models.DO_NOTHING, related_name="legal_source")
    media = models.ForeignKey(QuestionMedia, on_delete=models.DO_NOTHING, related_name="media")
    quest_category = models.ForeignKey(QuestionCategory, on_delete=models.DO_NOTHING, related_name="quest_category")
    quest_purpose = models.ForeignKey(QuestionPurpose, on_delete=models.DO_NOTHING, related_name="quest_purpose")
    quest_txt = models.ForeignKey(QuestionText, on_delete=models.DO_NOTHING, related_name="quest_txt")
    safety_relation = models.ForeignKey(QuestionSafety, on_delete=models.DO_NOTHING, related_name="safety")
    subject = models.ForeignKey(QuestionSubject, on_delete=models.DO_NOTHING, related_name="subject")

class MainResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    exam_date = models.DateTimeField(auto_now_add=True)
    total_score = models.CharField(max_length=2)
    correct_answers = models.CharField(max_length=2)
    wrong_answers = models.CharField(max_length=2)
    skip_answers = models.CharField(max_length=2)

class DetailResult(models.Model):
    main_result = models.ForeignKey(MainResult, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    isCorrect = models.BooleanField(default=False)
    userAnswer = models.CharField(max_length=1)

# [
#     {
#         'questionId':1,
#         isCorrect: True,
#         userAnswer:T,
#     }
# ]