# Generated by Django 3.2.6 on 2021-08-26 05:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
            options={
                'db_table': 'customers',
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.customer')),
            ],
            options={
                'db_table': 'projects',
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.project')),
            ],
            options={
                'db_table': 'tasks',
            },
        ),
        migrations.CreateModel(
            name='TaskLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('duration_minutes', models.IntegerField()),
                ('logged_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tracking.task')),
            ],
            options={
                'db_table': 'task_logs',
            },
        ),
        migrations.AddConstraint(
            model_name='tasklog',
            constraint=models.CheckConstraint(check=models.Q(('duration_minutes__gt', 0)), name='duration_gt_0'),
        ),
    ]
