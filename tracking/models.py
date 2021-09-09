from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.fields.related import ForeignKey

from django.utils.timezone import now as timezone_now


class TaskLog(models.Model):

    task = models.ForeignKey("Task", on_delete=models.CASCADE)
    logged_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    start = models.DateTimeField(default=timezone_now)
    stop = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        if self.stop is None:
            stop_text = "Pending"
        else:
            stop_text = self.stop.isoformat()
        return f"{self.__class__.__name__} {self.id} ({self.start.isoformat() - stop_text}) by {self.logged_by} for {self.task}"

    class Meta:
        # Take things literally and copy table names from the schema
        db_table = "task_logs"
        constraints = [
            # models.CheckConstraint(
            #     check=models.Q(duration_minutes__gt=0), name="duration_gt_0"
            # )
        ]


class Task(models.Model):

    description = models.TextField()
    project = models.ForeignKey("Project", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.__class__.__name__} {self.id} ({self.description[:64]}) for {self.project}"

    class Meta:
        # Take things literally and copy table names from the schema
        db_table = "tasks"


class Project(models.Model):

    customer = ForeignKey("Customer", on_delete=models.CASCADE)
    name = models.TextField()

    def __str__(self):
        return f"{self.__class__.__name__} {self.name} for {self.customer}"

    class Meta:
        # Take things literally and copy table names from the schema
        db_table = "projects"


class Customer(models.Model):

    name = models.TextField()

    def __str__(self):
        return f"{self.__class__.__name__} {self.name}"

    class Meta:
        # Take things literally and copy table names from the schema
        db_table = "customers"
