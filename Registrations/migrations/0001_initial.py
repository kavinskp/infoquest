# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-02-21 04:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Infoquest_student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('registration_type', models.CharField(blank=True, max_length=1, null=True)),
                ('department', models.CharField(blank=True, max_length=70, null=True)),
                ('college', models.CharField(max_length=130)),
                ('location', models.CharField(max_length=130)),
                ('year_of_study', models.CharField(choices=[('1', '1st Year'), ('2', '2nd Year'), ('3', '3rd Year'), ('4', '4th Year')], max_length=1)),
                ('phone_number', models.CharField(max_length=10)),
                ('accommodation', models.BooleanField(default=False)),
                ('on_spot', models.BooleanField(default=False)),
                ('present', models.BooleanField(default=False)),
                ('time_created', models.DateTimeField()),
                ('activation_key', models.CharField(max_length=40)),
                ('key_expires', models.DateTimeField()),
                ('mail_verified', models.BooleanField(default=False)),
                ('entry_time', models.DateTimeField(blank=True, null=True)),
                ('id_number', models.CharField(blank=True, max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='workshop_student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('department', models.CharField(blank=True, max_length=70, null=True)),
                ('college', models.CharField(max_length=130)),
                ('location', models.CharField(max_length=130)),
                ('year_of_study', models.CharField(choices=[('1', '1st Year'), ('2', '2nd Year'), ('3', '3rd Year'), ('4', '4th Year')], max_length=1)),
                ('phone_number', models.CharField(max_length=10)),
                ('accommodation', models.BooleanField(default=False)),
                ('on_spot', models.BooleanField(default=False)),
                ('present', models.BooleanField(default=False)),
                ('time_created', models.DateTimeField()),
                ('activation_key', models.CharField(max_length=40)),
                ('key_expires', models.DateTimeField()),
                ('mail_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]