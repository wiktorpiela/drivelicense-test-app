# Generated by Django 4.2.1 on 2023-06-04 13:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0010_delete_question'),
    ]

    operations = [
        migrations.DeleteModel(
            name='QuestionMedia',
        ),
    ]
