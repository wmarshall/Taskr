from datetime import timedelta
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Customer, Project, Task, TaskLog


class TaskLogSerializer(serializers.ModelSerializer):

    duration_minutes = serializers.SerializerMethodField()

    def get_duration_minutes(self, instance):
        if instance.stop is not None:
            return (instance.stop - instance.start) // timedelta(minutes=1)

    class Meta:
        model = TaskLog
        fields = ["id", "task", "logged_by", "start", "stop", "duration_minutes"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "description", "project"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "customer", "name"]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username"]
