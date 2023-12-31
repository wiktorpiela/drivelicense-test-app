# Generated by Django 4.2.1 on 2023-06-04 08:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionCorrectAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct_answer', models.CharField(max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionPossibleAnswers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('A', models.TextField()),
                ('B', models.TextField()),
                ('C', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='QuestionScores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score_value', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='QuestionSubject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quest_subject', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='QuestionType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quest_type', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quest_name', models.CharField(max_length=20)),
                ('quest_num', models.IntegerField()),
                ('quest_txt', models.TextField()),
                ('category', models.CharField(max_length=30)),
                ('legal_source', models.TextField()),
                ('quest_purpose', models.TextField()),
                ('safety_relation', models.TextField()),
                ('abc_answers', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='abc_answers', to='testapp.questionpossibleanswers')),
                ('media', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='media', to='testapp.questionmedia')),
                ('quest_correct_answer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='quest_correct_answer', to='testapp.questioncorrectanswer')),
                ('score', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='score', to='testapp.questionscores')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='subject', to='testapp.questionsubject')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='type', to='testapp.questiontype')),
            ],
        ),
    ]
