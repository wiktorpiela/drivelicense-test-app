# Generated by Django 4.2.1 on 2023-06-04 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='abc_answers',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='media',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='quest_correct_answer',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='subject',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='question',
            name='type',
            field=models.IntegerField(),
        ),
    ]
