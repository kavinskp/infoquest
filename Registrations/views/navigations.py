from pprint import pprint
from time import sleep

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils import timezone
from django.utils.crypto import random
import hashlib

from Registrations.models import Infoquest_student
from Infoquest.models import queries, individual_round, shortlisted_candidates
from Registrations.send_mail import sendEmail_Infoquest, sendEmail_Registration_Infoquest
from workshop.models import workshop_queries


def index(request):
    return render(request, "home.html")

def workshop(request):
    if request.method == 'POST':
        if 'send_message' in request.POST:
            got_name = request.POST.get('name')
            got_email = request.POST.get('email')
            got_message = request.POST.get('message')
            got_phone = request.POST.get('mobile')

            workshop_queries_instance = workshop_queries(
                name=got_name,
                email=got_email,
                phone_number=got_phone,
                query=got_message,
                time_created=timezone.now()
            )
            workshop_queries_instance.save()
            return render(request, "workshop.html", {'message': 'true'})
    return render(request, "workshop.html")


def iq(request):
    return render(request, "info_template/home_page.html")


def events(request):
    return render(request, 'info_template/events.html')


def result(request):

    events_list = individual_round.objects.filter(result_enable=True).exclude(order_number=0).exclude(round=1).order_by('order_number')
    return render(request, 'info_template/result.html',
                  {
                      'events_list': events_list
                  })


def single(request):
    return render(request, 'info_template/single.html')


def ppt(request):
    return render(request, 'info_template/descriptions/ppt.html')


def icon(request):
    return render(request, 'info_template/descriptions/icon.html')


def programming(request):
    return render(request, 'info_template/descriptions/programming.html')


def web_design(request):
    return render(request, 'info_template/descriptions/web_design.html')


def master_mind(request):
    return render(request, 'info_template/descriptions/master_mind.html')


def quiz(request):
    return render(request, 'info_template/descriptions/quiz.html')


def creative_eye(request):
    return render(request, 'info_template/descriptions/creative_eye.html')


def blind_coding(request):
    return render(request, 'info_template/descriptions/creative_eye/blind_coding.html')


def eagle_finger(request):
    return render(request, 'info_template/descriptions/creative_eye/eagle_finger.html')


def meme_creation(request):
    return render(request, 'info_template/descriptions/creative_eye/meme_creation.html')


def connections(request):
    return render(request, 'info_template/descriptions/creative_eye/connections.html')


def gaming(request):
    return render(request, 'info_template/descriptions/gaming.html')


def poster(request):
    return render(request, 'info_template/descriptions/poster.html')


def photography(request):
    return render(request, 'info_template/descriptions/photography.html')


def contact(request):
    if request.method == 'POST':
        if 'send_mail' in request.POST:
            got_name = request.POST.get('name')
            got_email = request.POST.get('email')
            got_mobile = request.POST.get('mobile')
            got_message = request.POST.get('message')

            queries_instance = queries(
                name=got_name,
                email=got_email,
                phone_number=got_mobile,
                query=got_message,
                time_created=timezone.now()
            )
            queries_instance.save()
            return render(request, 'info_template/contact.html', {'mail': 'true'})

    return render(request, 'info_template/contact.html')


def register(request):
    if request.method == 'POST':
        register_type = 'R'
        if 'register_ppt' in request.POST:
            register_type = 'P'

        if 'register_events' in request.POST:
            register_type = 'E'

        if 'register_ppt_events' in request.POST:
            register_type = 'B'

        name = request.POST.get('name')
        gender = request.POST.get('gender')
        email = request.POST.get('email')
        mobile_number = str(request.POST.get('mobile'))
        department_name = request.POST.get('department')
        college_name = request.POST.get('college')
        location = request.POST.get('location')
        year_of_study = request.POST.get('year')
        accommodation = request.POST.get('accommodation')

        if Infoquest_student.objects.filter(email=email):
            return render(request, 'prompt_pages/registered_mail_infoquest.html', {'email': email})

        if Infoquest_student.objects.filter(phone_number=mobile_number):
            return render(request, 'prompt_pages/registered_phone_infoquest.html', {'phone': mobile_number})

        accommodation_needed = False
        if accommodation == 'Y':
            accommodation_needed = True


        # if len(mobile_number) != 10:
        #     msg = {
        #         'page_title': 'Invalid',
        #         'title': 'Invalid Mobile Number',
        #         'description': 'You have entered an invalid mobile number'
        #     }
        #     return render(request, 'prompt_pages/error_page_base.html', {'message': msg})

        instance = Infoquest_student(
            registration_type=register_type,
            name=name,
            gender=gender,
            email=email,
            phone_number=mobile_number,
            department=department_name,
            college=college_name,
            location=location,
            year_of_study=year_of_study,
            accommodation=accommodation_needed,
            time_created=timezone.now()
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

        # pprint(instance)
        instance.save()

        # print(vars(temp))

        content = ''
        date = '27.08.2017 & 28.03.2017'
        if register_type == 'P':
            content = 'for Paper Exposit' \
                      '\nSend your abstract with your team member details like name, email, mobile number, college (one abstract for a team) to mail: ppt@infoquestgct.com'
            date = '27.03.2017'

        if register_type == 'E':
            content = 'for Events'

        if register_type == 'B':
            content = 'for Paper Exposit and Events' \
                      '\nSend your abstract with your team member details like name, email, mobile number, college (one abstract for a team) to mail: ppt@infoquestgct.com'


        user_data = {}
        user_data['name'] = str(name)
        user_data['gender'] = str(gender)
        user_data['email'] = str(email)
        user_data['phone_number'] = str(mobile_number)
        user_data['department'] = str(department_name)
        user_data['register_type'] = str(register_type)
        user_data['college'] = str(college_name)
        user_data['location'] = str(location)
        user_data['year_of_study'] = str(year_of_study)
        user_data['accommodation'] = str(accommodation_needed)
        user_data['time_created'] = str(timezone.now())
        sendEmail_Registration_Infoquest(user_data)

        datas = {}
        datas['content'] = content
        datas['date'] = date
        datas['name'] = instance.name
        datas['email'] = email
        datas['activation_key'] = key

        sendEmail_Infoquest(datas)
        return render(request, 'Registrations/signup_success.html', {'mail': email})
    return render(request, "info_template/registration.html", {})
