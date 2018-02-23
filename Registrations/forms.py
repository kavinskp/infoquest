from django.conf import settings
from django import forms
from django.core.mail import send_mail
# from django.forms.widgets import RadioFieldRenderer
from django.http import HttpRequest
from django.utils.encoding import force_text
from django.utils.html import format_html_join
from Registrations.models import CustomUser, workshop_student
import re
import datetime

from django.contrib.admin import widgets


# class RadioFieldWithoutULRenderer(RadioFieldRenderer):
#     def render(self):
#         return format_html_join(
#             '\n',
#             '{0}',
#             [(force_text(w),) for w in self],
#         )


class RegisterStudent(forms.ModelForm):
    email = forms.CharField(max_length=256)
    #password1 = forms.CharField(widget=forms.PasswordInput)
    #password2 = forms.CharField(widget=forms.PasswordInput, label='Password(Again)')
    gender = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=workshop_student.GENDER_CHOICES
    )

    def clean_email(self):
        cd=self.cleaned_data
        email=cd.get('email')
        if not re.match(r'^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$',email):
            raise forms.ValidationError("Please enter a valid email id")
        if CustomUser.objects.filter(email=email):
            raise forms.ValidationError("This email id has already been registered")
        return email


    def clean_name(self):
        cd = self.cleaned_data
        first_name = cd.get('name')
        first_name=first_name.title()
        if not re.match(r'^([a-zA-Z]+)$', first_name):
            raise forms.ValidationError("Enter a valid name")
        return first_name

    def clean_dob(self):
        cd=self.cleaned_data
        dob=cd.get('dob')
        if not datetime.datetime.strptime(str(dob), '%Y-%m-%d'):
            raise forms.ValidationError("Enter the date in the given format (YYYY-MM-DD)")
        return dob

    def clean_phone_number(self):
        cd=self.cleaned_data
        phone_number=cd.get('phone_number')
        if not re.match(r'^((\d+){10})$', phone_number):
            raise forms.ValidationError("Enter a valid mobile number")
        return phone_number


    def clean(self):
        cd=self.cleaned_data
        email=cd.get('email')
        first_name=cd.get('first_name')
        middle_name = cd.get('middle_name')
        last_name = cd.get('last_name')
        dob=cd.get('dob')
        phone_number=cd.get('phone_number')
        return cd

    required_field = ['email',
                      'name',
                      'gender',
                      'year_of_study',
                      'department',
                      'college',
                      # 'qualification',
                      'phone_number',
                      ]

    class Meta:
        model = workshop_student
        fields = ['email',
                  'name',
                  'gender',
                  'college',
                  'year_of_study',
                  'department',
                  # 'qualification',
                  'phone_number',
                  ]
        exclude = ['user']

    def __init__(self, *args, **kwargs):
        super(RegisterStudent, self).__init__(*args, **kwargs)
        for field in RegisterStudent.required_field:
            self.fields[field].required = True

        self.fields['email'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'example@gmail.com'
        })
        self.fields['name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Name'
        })
        self.fields['department'].widget.attrs.update({
            'class': 'form-control'
        })
        self.fields['college'].widget.attrs.update({
            'class': 'form-control'
        })
        self.fields['phone_number'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': '10 digit mobile number'
        })
        self.fields['dob'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'YYYY-MM-DD',
        })

    def sendEmail(self, datas):
        link = settings.CURRENT_HOST_NAME + 'activate/' + datas['activation_key']
        subject = 'Workshop @ GCT -  Registration Confirmation'
        message = 'Welcome to you to the Workshop  \nClick the following link to confirm your registration ' + link
        from_email = settings.EMAIL_HOST_USER
        send_mail(subject, message, from_email, [datas['email']], fail_silently=False)




class LoginForm(forms.Form):
    email = forms.CharField(max_length=256)
    password = forms.CharField(widget=forms.PasswordInput())
    def clean_email(self):
        cd=self.cleaned_data
        email=cd.get('email')
        if not re.match(r'^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$',email):
            raise forms.ValidationError("Please enter a valid email id")
        if not CustomUser.objects.filter(email=email):
            raise forms.ValidationError("This email id has not been registered yet")
        return email

   # def clean_password(self):
    #    cd=self.cleaned_data
     #  if len(password)<8:
      #      raise forms.ValidationError("Password should contain atleast 8 characters")
       # return password

    def clean(self):
        cd=self.cleaned_data
        email=cd.get('email')
        return cd


class passchange(forms.Form):
    email=forms.CharField(max_length=256)
    oldpass=forms.CharField(widget=forms.PasswordInput())
    newpass=forms.CharField(widget=forms.PasswordInput())
    newpass_again=forms.CharField(widget=forms.PasswordInput())
    def clean_email(self):
        cd=self.cleaned_data
        email=cd.get('email')
        if not re.match(r'^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$',email):
            raise forms.ValidationError("Please enter a valid email id")
        if CustomUser.objects.filter(email=email):
            raise forms.ValidationError("This email id has already been registered")
        return email

    def clean_newpass(self):
        cd=self.cleaned_data
        password1=cd.get('newpass')
        if len(password1)<8:
            raise forms.ValidationError("Password should contain atleast 8 characters")
        return password1

    def clean_newpass_again(self):
        cd=self.cleaned_data
        password1 = cd.get('newpass')
        password2 = cd.get('newpass_again')
        if not password2:
            raise forms.ValidationError("You must confirm your password")
        if password1 != password2:
            raise forms.ValidationError("Your passwords do not match")
        return password2

    def clean(self):
        cd=self.cleaned_data
        email=cd.get('email')
        password1=cd.get('newpass')
        password2=cd.get('newpass_again')
        return cd