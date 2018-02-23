from django.db import models
from Registrations.models import Infoquest_student, workshop_student


class queries(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=10)
    query = models.CharField(max_length=5000)
    time_created = models.DateTimeField()


class events(models.Model):
    event_name = models.CharField(max_length=100)
    rounds = models.PositiveSmallIntegerField()
    result_enable = models.BooleanField(default=False)
    order_number = models.PositiveSmallIntegerField()
    timings = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    coordinator_name = models.CharField(max_length=100, blank=True, null=True)
    coordinator_phone = models.CharField(max_length=100, blank=True, null=True)
    extra = models.CharField(max_length=200, blank=True, null=True)


class shortlisted_candidates(models.Model):
    event = models.ForeignKey(events,on_delete=models.CASCADE)
    round = models.PositiveSmallIntegerField()
    student = models.ForeignKey(Infoquest_student, on_delete=models.CASCADE)


class ppt(models.Model):
    student = models.ForeignKey(Infoquest_student, on_delete=models.CASCADE)
    mail_status = models.BooleanField(default=False)


class mail_sent_students_ppt(models.Model):
    student = models.ForeignKey(Infoquest_student, on_delete=models.CASCADE)
    mail_status = models.BooleanField(default=False)


class infoquest_mail(models.Model):
    student = models.ForeignKey(Infoquest_student, on_delete=models.CASCADE)
    mail_status = models.BooleanField(default=False)


class workshop_mail(models.Model):
    student = models.ForeignKey(workshop_student,on_delete=models.CASCADE)
    mail_status = models.BooleanField(default=False)


class individual_round(models.Model):
    event = models.ForeignKey(events,on_delete=models.CASCADE)
    round = models.PositiveSmallIntegerField()
    result_enable = models.BooleanField(default=False)
    order_number = models.PositiveSmallIntegerField()


class next_id_number(models.Model):
    key = models.CharField(max_length=20)
    value = models.CharField(max_length=20)