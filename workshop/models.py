from django.db import models

# Create your models here.

class workshop_queries(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    query = models.CharField(max_length=5000)
    time_created = models.DateTimeField()