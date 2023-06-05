# Generated by Django 4.2.1 on 2023-06-04 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0003_delete_question'),
    ]

    operations = [
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
                ('abc_answers', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='abc_answers', to='testapp.questionpossibleanswers')),
                ('media', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='media', to='testapp.questionmedia')),
                ('quest_correct_answer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='quest_correct_answer', to='testapp.questioncorrectanswer')),
                ('score', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='score', to='testapp.questionscores')),
                ('subject', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='subject', to='testapp.questionsubject')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='type', to='testapp.questiontype')),
            ],
        ),
    ]
