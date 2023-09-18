from django.contrib import admin
from . import models

admin.site.register(models.QuestionCategory)
admin.site.register(models.QuestionLegalSource)
admin.site.register(models.QuestionPossibleAnswers)
admin.site.register(models.QuestionPurpose)
admin.site.register(models.QuestionMedia)
admin.site.register(models.QuestionText)
admin.site.register(models.QuestionSafety)
admin.site.register(models.QuestionSubject)
admin.site.register(models.Question)

admin.site.register(models.MainResult)

