from pprint import pprint

from django.contrib.auth import login, authenticate, logout, backends
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response, redirect, get_object_or_404
from django import forms
from django.utils import timezone
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, EmailMessage
from django.utils.crypto import random
import hashlib
from datetime import datetime, date, time, timedelta

from Registrations.models import CustomUser, workshop_student,Infoquest_student
from Registrations.forms import LoginForm, passchange

from Registrations.send_mail import sendEmail
# , sendEmail_Registration_Workshop


def signup(request):
    if request.method == 'POST':
        if 'register' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            email = request.POST.get('email')
            mobile_number = request.POST.get('mobile')
            department_name = request.POST.get('department')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            payment = request.POST.get('payment')
            transaction_id = request.POST.get('transaction_id')

            if workshop_student.objects.filter(email=email):
                return render(request, 'prompt_pages/registered_mail.html', {'email': email})

            if workshop_student.objects.filter(phone_number=mobile_number):
                return render(request, 'prompt_pages/registered_phone.html', {'phone': mobile_number})

            if payment == 'N':
                if transaction_id != '':
                    msg = {
                        'page_title': 'Invalid',
                        'title': 'Transaction ID needed for only online Registration',
                        'description': 'Choose payment mode as online if you have paid already'
                    }
                    return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

                transaction_id = False

            online_payment = False
            if payment == 'Y':
                online_payment = True
                if transaction_id == '':
                    msg = {
                        'page_title': 'Invalid',
                        'title': 'Transaction ID needed for online Registration',
                        'description': 'Transaction Id needed to confirm your online payment'
                    }
                    return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

            if len(mobile_number) != 10:
                msg = {
                    'page_title': 'Invalid',
                    'title': 'Invalid Mobile Number',
                    'description': 'You have entered an invalid mobile number'
                }
                return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

            instance = workshop_student(
                name=name,
                gender=gender,
                email=email,
                phone_number=mobile_number,
                department=department_name,
                college=college_name,
                location=location,
                year_of_study=year_of_study,
                accommodation=False,
                time_created=timezone.now(),
                transaction_id = transaction_id,
            )


            random_number_string = str(random.random())
            random_number_string = random_number_string.encode('utf-8')
            salt = hashlib.sha1(random_number_string).hexdigest()[:5]
            salt = salt.encode('utf-8')
            usernamesalt = email
            usernamesalt = usernamesalt.encode('utf8')

            key = hashlib.sha1(salt + usernamesalt)
            key = key.hexdigest()
            instance.activation_key = key
            instance.key_expires = timezone.now() + timezone.timedelta(days=2)

            #pprint(instance)
            instance.save()

            # print(vars(temp))

            user_data = {}
            user_data['name'] = str(name)
            user_data['gender'] = str(gender)
            user_data['email'] = str(email)
            user_data['phone_number'] = str(mobile_number)
            user_data['department'] = str(department_name)
            user_data['college'] = str(college_name)
            user_data['location'] = str(location)
            user_data['year_of_study'] = str(year_of_study)
            user_data['transaction_id'] = str(transaction_id)
            # user_data['accommodation'] = str(accommodation_needed)
            user_data['time_created'] = str(timezone.now())
            # sendEmail_Registration_Workshop(user_data)

            datas = {}
            datas['name'] = instance.name
            datas['email'] = email
            datas['activation_key'] = key
            # datas['transaction_id'] = transaction_id

            sendEmail(datas)
            return render(request, 'prompt.html', {'mail': email})

    return render(request, "Registrations/signup.html", {})



def infoquest_signup(request):
    if request.method == 'POST':
        if 'register' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            email = request.POST.get('email')
            mobile_number = request.POST.get('mobile')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')
            payment = request.POST.get('payment')
            transaction_id = request.POST.get('transaction_id')
            if Infoquest_student.objects.filter(email=email):
                return render(request, 'prompt_pages/registered_mail_infoquest.html', {'email': email})
            if payment == 'N':
                if transaction_id != '':
                    msg = {
                        'page_title': 'Invalid',
                        'title': 'Transaction ID needed for only online Registration',
                        'description': 'Choose payment mode as online if you have paid already'
                    }
                    return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

                transaction_id = False

            online_payment = False
            if payment == 'Y':
                online_payment = True
                if transaction_id == '':
                    msg = {
                        'page_title': 'Invalid',
                        'title': 'Transaction ID needed for online Registration',
                        'description': 'Transaction Id needed to confirm your online payment'
                    }
                    return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True
            if len(mobile_number) != 10:
                msg = {
                    'page_title': 'Invalid',
                    'title': 'Invalid Mobile Number',
                    'description': 'You have entered an invalid mobile number'
                }
                return render(request, 'prompt_pages/error_page_base.html', {'message': msg})


            instance = Infoquest_student(
                name=name,
                gender=gender,
                email=email,
                phone_number=mobile_number,
                college=college_name,
                location=location,
                year_of_study=year_of_study,
                accommodation=accommodation_needed,
                time_created=timezone.now(),
            )

            random_number_string = str(random.random())
            random_number_string = random_number_string.encode('utf-8')
            salt = hashlib.sha1(random_number_string).hexdigest()[:5]
            salt = salt.encode('utf-8')
            usernamesalt = email
            usernamesalt = usernamesalt.encode('utf8')

            key = hashlib.sha1(salt + usernamesalt)
            key = key.hexdigest()
            instance.activation_key = key
            instance.key_expires = timezone.now() + timezone.timedelta(days=2)

            #pprint(instance)
            instance.save()

            # print(vars(temp))

            datas = {}
            datas['email'] = email
            datas['activation_key'] = key

            sendEmail(datas)
            return render(request, 'Registrations/signup_success.html')

    return render(request, "Registrations/infoquest_signup.html", {})



def userlogin(request):
    login_form = LoginForm()
    # request.session.clear()
    request.session['last_visit'] = None
    request.session['logged_first'] = True
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(email=email, password=password)
        # print('user='+str(user))
        if user is not None:
            for obj in CustomUser.objects.filter(email=email):
                is_verified_user = obj.is_superuser
            if is_verified_user:
                print(email)
                request.session['user_name'] = str(obj.email)
                # print('user=' + str(request.session['gender']))
                # last_login = ''
                for obj in CustomUser.objects.filter(email=str(user)):
                    last_login = obj.last_login
                print('last_visit=' + str(last_login))
                if last_login:
                    request.session['last_visit'] = last_login.strftime("%d %B %Y at %l:%M:%S %p")
                    today = str(date.today())
                    # print('today='+str(today))
                    yesterday = str(date.today() - timedelta(1))
                    # print('yesterday='+str(yesterday))
                    last_login_date = str(last_login.strftime("%Y-%m-%d"))
                    # print('last_login_date='+str(last_login_date))
                    if last_login_date == today:
                        last_login_time = str(last_login.strftime(" at %l:%M:%S %p"))
                        request.session['last_visit'] = 'Today' + last_login_time
                    elif last_login_date == yesterday:
                        last_login_time = str(last_login.strftime(" at %l:%M:%S %p"))
                        request.session['last_visit'] = 'Yesterday' + last_login_time
                else:
                    request.session['last_visit'] = 'welcome'
                login(request, user)
                return redirect('/dashboard/')
            else:
                request.session['delete_user'] = email
                msg = {
                    'page_title': 'GCT | Verification error',
                    'title': 'Account not verified',
                    'description': 'Your email is not yet verified',
                }
                return render(request, 'prompt_pages/invalid_account.html', {'message': msg})
        else:
            # print('not valid')
            msg = {
                'page_title': 'GCT | Login error',
                'title': 'Invalid account',
                'description': 'Email and password did not match!',
            }
            return render(request, 'prompt_pages/invalid_account.html', {'message': msg})
    else:
        return render(request, "Registrations/login.html", {'loginForm': login_form})


def userlogout(request):
    request.session.clear()
    logout(request)
    return HttpResponseRedirect('/')


def homepagelogout(request):
    request.session.clear()
    logout(request)
    return HttpResponseRedirect('/')


def cancel(request):
    user = request.session['delete_user']
    CustomUser.objects.filter(email=user).delete()
    msg = {
        'page_title': 'Signup success',
        'title': 'Account Deleted',
        'description': user + '\'s request canceled successfully...'
    }
    return render(request, 'prompt_pages/error_page_base.html', {'message': msg})


def signup_success(request):
    return render(request, 'Registrations/signup_success.html')


def activation(request, key):
    activation_expired = False
    already_active = False
    try:
        user = workshop_student.objects.get(activation_key=key)
    except:
        msg = {
            'page_title': 'Access Denied',
            'title': 'Access Denied',
            'description': 'You don\'t have permission to access this page'
        }
        return render(request, 'prompt_pages/error_page_base.html', {'message': msg})
    # print(vars(user))
    if user.mail_verified == False:
        user.mail_verified = True
        user.save()

    # If user is already active, simply display error message
    else:
        already_active = True  # Display : error message
    return render(request, 'confirmation_success.html', locals())


def activation_infoquest(request, key):
    activation_expired = False
    already_active = False
    try:
        user = Infoquest_student.objects.get(activation_key=key)
    except:
        msg = {
            'page_title': 'Access Denied',
            'title': 'Access Denied',
            'description': 'You don\'t have permission to access this page'
        }
        return render(request, 'prompt_pages/error_page_base.html', {'message': msg})
    # print(vars(user))
    if user.mail_verified == False:
        user.mail_verified = True
        user.save()

    # If user is already active, simply display error message
    else:
        already_active = True  # Display : error message
    return render(request, 'prompt_pages/activated_mail_infoquest.html', locals())


@login_required
def changepass(request):
    change_pass = passchange()
    if request.method == 'POST':
        # emailid = request.POST['email']
        emailid = CustomUser.objects.get(email=request.user)
        oldpass = request.POST['oldpass']
        newpass1 = request.POST['newpass']
        newpass2 = request.POST['newpass_again']
        checker = authenticate(email=emailid, password=oldpass)
        if newpass1 and newpass2 and newpass1 != newpass2:
            msg = {
                'page_title': 'Update failure',
                'title': 'Profile not updated',
                'description': 'Your passwords does not match!Try again..',
            }
            return render(request, "prompt_pages/update_message.html", {'message': msg})
        elif newpass1 == oldpass:
            msg = {
                'page_title': 'Update failure',
                'title': 'Profile not updated',
                'description': 'Your have used the same password! Use a different password..',
            }
            return render(request, "prompt_pages/update_message.html", {'message': msg})
        elif checker is not None:
            u = CustomUser.objects.get(email=emailid)
            u.set_password(newpass1)
            u.save()
            msg = {
                'page_title': 'Update success',
                'title': 'Profile updated',
                'description': 'Your password has been successfully changed!',
            }
            return render(request, "prompt_pages/update_message.html", {'forgotpass': change_pass, 'message': msg})
        else:
            msg = {
                'page_title': 'Update failure',
                'title': 'Profile not updated',
                'description': 'Username and email id mismatch! Forgot your password? Try resetting it..',
            }
            return render(request, "prompt_pages/update_message.html", {'message': msg})
    else:
        return render(request, "Registrations/changepass.html", {'changepass': change_pass})
