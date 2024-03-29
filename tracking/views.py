from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from django.utils.timezone import now as timezone_now

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

    def create(self, request, *args, **kwargs):
        request.data["logged_by"] = request.user.id
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=["POST"])
    def stop(self, request, pk=None):
        task_log = self.get_object()
        task_log.stop = timezone_now()
        task_log.save()
        return Response({"status": "task log stopped"})


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


@api_view(["GET"])
@permission_classes([permissions.AllowAny])
@ensure_csrf_cookie
def bootstrap(_):
    return Response({"status": "success"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # HACK: I'd like to use Django's default view here but it doesn't want to return 403s on failure
        login(request._request, user)
        return Response({"status": "success"}, status=status.HTTP_200_OK)

    return Response({"status": "forbidden"}, status=status.HTTP_403_FORBIDDEN)
