# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-03-01 08:37
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Registrations', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='events',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.CharField(max_length=100)),
                ('rounds', models.PositiveSmallIntegerField()),
                ('result_enable', models.BooleanField(default=False)),
                ('order_number', models.PositiveSmallIntegerField()),
                ('timings', models.CharField(blank=True, max_length=100, null=True)),
                ('location', models.CharField(blank=True, max_length=200, null=True)),
                ('coordinator_name', models.CharField(blank=True, max_length=100, null=True)),
                ('coordinator_phone', models.CharField(blank=True, max_length=100, null=True)),
                ('extra', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='individual_round',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.PositiveSmallIntegerField()),
                ('result_enable', models.BooleanField(default=False)),
                ('order_number', models.PositiveSmallIntegerField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='iq.events')),
            ],
        ),
        migrations.CreateModel(
            name='infoquest_mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail_status', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registrations.Infoquest_student')),
            ],
        ),
        migrations.CreateModel(
            name='mail_sent_students_ppt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail_status', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registrations.Infoquest_student')),
            ],
        ),
        migrations.CreateModel(
            name='next_id_number',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=20)),
                ('value', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ppt',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail_status', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registrations.Infoquest_student')),
            ],
        ),
        migrations.CreateModel(
            name='queries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=10)),
                ('query', models.CharField(max_length=5000)),
                ('time_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='shortlisted_candidates',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.PositiveSmallIntegerField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='iq.events')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registrations.Infoquest_student')),
            ],
        ),
        migrations.CreateModel(
            name='workshop_mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail_status', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Registrations.workshop_student')),
            ],
        ),
    ]