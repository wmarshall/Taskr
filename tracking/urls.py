from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CustomerViewSet,
    ProjectViewSet,
    TaskLogViewSet,
    TaskViewSet,
    UserViewSet,
    bootstrap,
    login_view
)

router = DefaultRouter()
router.register(r"tasklogs", TaskLogViewSet)
router.register(r"tasks", TaskViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"customers", CustomerViewSet)
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("auth/", include('rest_framework.urls')),
    path("bootstrap", bootstrap),
    path("login", login_view),
]
