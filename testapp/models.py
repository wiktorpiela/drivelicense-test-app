from django.db import models

class QuestionMedia(models.Model):
    path = models.CharField(max_length=255)

class QuestionScores(models.Model):
    score_value = models.IntegerField()

class QuestionType(models.Model):
    quest_type = models.CharField(max_length=20)

class QuestionSubject(models.Model):
    quest_subject = models.CharField(max_length=50)

class QuestionPossibleAnswers(models.Model):
    A = models.TextField()
    B = models.TextField()
    C = models.TextField()

class QuestionCorrectAnswer(models.Model):
    correct_answer = models.CharField(max_length=1)

class Question(models.Model):
    quest_name = models.CharField(max_length=20)
    quest_num = models.IntegerField()
    quest_txt = models.TextField()
    category = models.TextField()
    legal_source = models.TextField()
    quest_purpose = models.TextField()
    safety_relation = models.TextField()
    abc_answers = models.ForeignKey(QuestionPossibleAnswers, on_delete=models.DO_NOTHING, related_name="abc_answers", blank=True, null=True)
    media = models.ForeignKey(QuestionMedia, on_delete=models.DO_NOTHING, related_name="media", blank=True, null=True)
    quest_correct_answer = models.ForeignKey(QuestionCorrectAnswer, on_delete=models.DO_NOTHING, related_name="quest_correct_answer")
    score = models.ForeignKey(QuestionScores, on_delete=models.DO_NOTHING, related_name="score")
    subject = models.ForeignKey(QuestionSubject, on_delete=models.DO_NOTHING, related_name="subject")
    type = models.ForeignKey(QuestionType, on_delete=models.DO_NOTHING, related_name="type")









