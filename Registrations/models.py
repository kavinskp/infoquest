from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

from .college_list import COLLEGE_CHOICES, DEPARTMENT_CHOICES


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        #user.is_approved = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    #is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):  # __unicode__ on Python 2
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_superuser



class workshop_student(models.Model):
    YEAR_OF_STUDY = (
        ('1', '1st Year'),
        ('2', '2nd Year'),
        ('3', '3rd Year'),
        ('4', '4th Year'),
    )

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    #user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    email =  models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    department = models.CharField(max_length=70, blank=True, null=True)
    college = models.CharField(max_length=130)
    location = models.CharField(max_length=130)
    year_of_study = models.CharField(max_length=1, choices=YEAR_OF_STUDY, null=False)
    # qualification = models.CharField(max_length=2, choices=QUALIFICATION_CHOICES)
    phone_number = models.CharField(max_length=10)
    accommodation = models.BooleanField(default=False)
    on_spot = models.BooleanField(default=False)
    present = models.BooleanField(default=False)
    time_created = models.DateTimeField()
    transaction_id = models.CharField(max_length=40,blank=True,null=True)
    activation_key = models.CharField(max_length=40)
    key_expires = models.DateTimeField()
    mail_verified = models.BooleanField(default=False)
    conf_tr_id=models.BooleanField(default=False)
    def __str__(self):
        name = str(self.name)
        return name


class Infoquest_student(models.Model):
    YEAR_OF_STUDY = (
        ('1', '1st Year'),
        ('2', '2nd Year'),
        ('3', '3rd Year'),
        ('4', '4th Year'),
    )

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    email = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    registration_type = models.CharField(max_length=1, blank=True, null=True)
    department = models.CharField(max_length=70, blank=True, null=True)
    college = models.CharField(max_length=130)
    location = models.CharField(max_length=130)
    year_of_study = models.CharField(max_length=1, choices=YEAR_OF_STUDY, null=False)
    phone_number = models.CharField(max_length=10)
    accommodation = models.BooleanField(default=False)
    on_spot = models.BooleanField(default=False)
    present = models.BooleanField(default=False)
    time_created = models.DateTimeField()
    activation_key = models.CharField(max_length=40)
    key_expires = models.DateTimeField()
    mail_verified = models.BooleanField(default=False)
    entry_time = models.DateTimeField(blank=True, null=True)
    id_number = models.CharField(max_length=20, blank=True, null=True)
    transaction_id = models.CharField(max_length=40,blank=True,null=True)
    conf_tr_id=models.BooleanField(default=False)
    def __str__(self):
        name = str(self.name)
        return name
