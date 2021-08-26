from django.contrib.auth import get_user_model
from rest_framework import viewsets

from .models import Customer, Project, Task, TaskLog
from .serializers import (
    CustomerSerializer,
    ProjectSerializer,
    TaskLogSerializer,
    TaskSerializer,
    UserSerializer,
)


class TaskLogViewSet(viewsets.ModelViewSet):
    queryset = TaskLog.objects.all()
    serializer_class = TaskLogSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """Provide Read views for users"""
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
