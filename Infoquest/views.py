from django.utils import timezone
from django.utils.crypto import random
import hashlib
from Registrations.send_mail import sendEmail_Infoquest

from pprint import pprint

from django.shortcuts import render

from django.contrib.auth.decorators import login_required
from easy_pdf.views import PDFTemplateView

from Infoquest.models import *


@login_required
def infoquest_total_students_entry(request):
    list_of_students = Infoquest_student.objects.all().filter(registration_type='P', present=True).order_by('time_created')
    ppt_students = Infoquest_student.objects.filter(registration_type='P')
    event_students = Infoquest_student.objects.filter(registration_type='E')
    pptevent_students = Infoquest_student.objects.filter(registration_type='B')
    ppt_students = len(ppt_students)
    event_students = len(event_students)
    pptevent_students = len(pptevent_students)
    boys = Infoquest_student.objects.filter(gender='M')
    boys = len(boys)
    girls = Infoquest_student.objects.filter(gender='F')
    girls = len(girls)
    accommodation_boys = Infoquest_student.objects.filter(gender='M', accommodation=True)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = Infoquest_student.objects.filter(gender='F', accommodation=True)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'infoquest/view_total_students_infoquest.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'total': boys + girls,
        'ppt_students': ppt_students,
        'event_students': event_students,
        'pptevent_students': pptevent_students
    })


@login_required
def infoquest_students_registered(request):
    list_of_students = Infoquest_student.objects.filter(mail_verified=True, on_spot=False).order_by('-time_created')
    ppt_students = Infoquest_student.objects.filter(registration_type='P', mail_verified=True, on_spot=False)
    event_students = Infoquest_student.objects.filter(registration_type='E', mail_verified=True, on_spot=False)
    pptevent_students = Infoquest_student.objects.filter(registration_type='B', mail_verified=True, on_spot=False)
    ppt_students = len(ppt_students)
    event_students = len(event_students)
    pptevent_students = len(pptevent_students)
    boys = Infoquest_student.objects.filter(gender='M', mail_verified=True, on_spot=False)
    boys = len(boys)
    girls = Infoquest_student.objects.filter(gender='F', mail_verified=True, on_spot=False)
    girls = len(girls)
    accommodation_boys = Infoquest_student.objects.filter(gender='M', accommodation=True, mail_verified=True,
                                                          on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = Infoquest_student.objects.filter(gender='F', accommodation=True, mail_verified=True,
                                                           on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'infoquest/view_registered_infoquest.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'total': boys + girls,
        'ppt_students': ppt_students,
        'event_students': event_students,
        'pptevent_students': pptevent_students
    })


@login_required
def infoquest_students_unverified(request):
    list_of_students = Infoquest_student.objects.filter(mail_verified=False, on_spot=False).order_by('-time_created')
    ppt_students = Infoquest_student.objects.filter(registration_type='P', mail_verified=False, on_spot=False)
    event_students = Infoquest_student.objects.filter(registration_type='E', mail_verified=False, on_spot=False)
    pptevent_students = Infoquest_student.objects.filter(registration_type='B', mail_verified=False, on_spot=False)
    ppt_students = len(ppt_students)
    event_students = len(event_students)
    pptevent_students = len(pptevent_students)
    boys = Infoquest_student.objects.filter(gender='M', mail_verified=False, on_spot=False)
    boys = len(boys)
    girls = Infoquest_student.objects.filter(gender='F', mail_verified=False, on_spot=False)
    girls = len(girls)
    accommodation_boys = Infoquest_student.objects.filter(gender='M', accommodation=True, mail_verified=False,
                                                          on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = Infoquest_student.objects.filter(gender='F', accommodation=True, mail_verified=False,
                                                           on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'infoquest/view_unverified_infoquest.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'total': boys + girls,
        'ppt_students': ppt_students,
        'event_students': event_students,
        'pptevent_students': pptevent_students
    })


@login_required
def infoquest_on_spot(request):
    list_of_students = Infoquest_student.objects.filter(on_spot=True).order_by('-time_created')
    ppt_students = Infoquest_student.objects.filter(registration_type='P', on_spot=True)
    event_students = Infoquest_student.objects.filter(registration_type='E', on_spot=True)
    pptevent_students = Infoquest_student.objects.filter(registration_type='BS', on_spot=True)
    ppt_students = len(ppt_students)
    event_students = len(event_students)
    pptevent_students = len(pptevent_students)
    boys = Infoquest_student.objects.filter(gender='M', on_spot=True)
    boys = len(boys)
    girls = Infoquest_student.objects.filter(gender='F', on_spot=True)
    girls = len(girls)
    accommodation_boys = Infoquest_student.objects.filter(gender='M', accommodation=True, on_spot=True)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = Infoquest_student.objects.filter(gender='F', accommodation=True, on_spot=True)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'infoquest/on_spot_infoquest.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'total': boys + girls,
        'ppt_students': ppt_students,
        'event_students': event_students,
        'pptevent_students': pptevent_students
    })


@login_required
def infoquest_boys_accommodation(request):
    list_of_students = Infoquest_student.objects.filter(accommodation=True, gender='M').order_by('-time_created')

    return render(request, 'infoquest/boys_accommodation.html', {
        'list_of_students': list_of_students
    })

@login_required
def infoquest_girls_accommodation(request):
    list_of_students = Infoquest_student.objects.filter(accommodation=True, gender='F').order_by('-time_created')

    return render(request, 'infoquest/girls_accommodation.html', {
        'list_of_students': list_of_students
    })


@login_required
def infoquest_pdf_total_students_entry(request):
    list_of_students = Infoquest_student.objects.all().filter(registration_type='P', present=True).order_by('time_created')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def infoquest_pdf_students_registered(request):
    list_of_students = Infoquest_student.objects.filter(mail_verified=True, on_spot=False)

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def infoquest_pdf_students_unverified(request):
    list_of_students = Infoquest_student.objects.filter(mail_verified=False, on_spot=False)

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def infoquest_pdf_students_onspot(request):
    list_of_students = Infoquest_student.objects.filter(on_spot=True)

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def infoquest_pdf_boys_accommodation(request):
    list_of_students = Infoquest_student.objects.filter(accommodation=True, gender='M')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def infoquest_pdf_girls_accommodation(request):
    list_of_students = Infoquest_student.objects.filter(accommodation=True, gender='F')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


class infoquest_TotalStudentsPDF(PDFTemplateView):
    template_name = "infoquest/total_students_infoquest_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_TotalStudentsPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_total_students_entry(self.request)
        return super(infoquest_TotalStudentsPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class infoquest_RegisteredPDF(PDFTemplateView):
    template_name = "infoquest/registered_infoquest_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_RegisteredPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_students_registered(self.request)
        return super(infoquest_RegisteredPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class infoquest_UnVerifiedPDF(PDFTemplateView):
    template_name = "infoquest/unverified_infoquest_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_UnVerifiedPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_students_unverified(self.request)
        return super(infoquest_UnVerifiedPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class infoquest_OnspotPDF(PDFTemplateView):
    template_name = "infoquest/onspot_infoquest_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_OnspotPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_students_onspot(self.request)
        return super(infoquest_OnspotPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class infoquest_boys_PDF(PDFTemplateView):
    template_name = "infoquest/boys_accommodation_infoquest.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_boys_PDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_boys_accommodation(self.request)
        return super(infoquest_boys_PDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class infoquest_girls_PDF(PDFTemplateView):
    template_name = "infoquest/girls_accommodation_infoquest_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(infoquest_girls_PDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = infoquest_pdf_girls_accommodation(self.request)
        return super(infoquest_girls_PDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


@login_required
def add_students_infoquest(request):
    if request.method == 'POST':
        if 'register' in request.POST:
            name = request.POST.get('name')
            id_number = request.POST.get('id_number')
            gender = request.POST.get('gender')
            register_type = request.POST.get('register_type')
            email = request.POST.get('email')
            mobile_number = request.POST.get('mobile')
            department_name = request.POST.get('department')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')

            if Infoquest_student.objects.filter(email=email):
                return render(request, 'prompt_pages/registered_mail.html', {'email': email})

            if Infoquest_student.objects.filter(phone_number=mobile_number):
                return render(request, 'prompt_pages/registered_phone.html', {'phone': mobile_number})

            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True

            instance = Infoquest_student(
                id_number=id_number,
                name=name,
                gender=gender,
                email=email,
                registration_type=register_type,
                phone_number=mobile_number,
                department=department_name,
                college=college_name,
                location=location,
                year_of_study=year_of_study,
                accommodation=accommodation_needed,
                on_spot=True,
                present=True,
                time_created=timezone.now(),
                entry_time=timezone.now()
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

            # if instance.registration_type == 'P':
            #     id_number = next_id_number.objects.get(key='P')
            #     instance.id_number = 'P' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()
            # if instance.registration_type == 'E':
            #     id_number = next_id_number.objects.get(key='E')
            #     instance.id_number = 'E' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()
            # if instance.registration_type == 'B':
            #     id_number = next_id_number.objects.get(key='B')
            #     instance.id_number = 'B' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()

            instance.save()

            return render(request, 'infoquest/present_student_id_number.html',
                          {
                              'student': instance
                          })
        if 'ok' in request.POST:
            return render(request, "infoquest/add_students_infoquest.html", {})

    return render(request, "infoquest/add_students_infoquest.html", {})


@login_required
def infoquest_mark_student_presence(request):
    if request.method == 'POST':
        if 'present' in request.POST:
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.present = True
            instance.entry_time = timezone.now()
            # if instance.registration_type == 'P':
            #     id_number = next_id_number.objects.get(key='P')
            #     instance.id_number = 'P' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()
            # if instance.registration_type == 'E':
            #     id_number = next_id_number.objects.get(key='E')
            #     instance.id_number = 'E' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()
            # if instance.registration_type == 'B':
            #     id_number = next_id_number.objects.get(key='B')
            #     instance.id_number = 'B' + str(id_number.value)
            #     id_number.value = int(id_number.value) + 1
            #     id_number.save()

            instance.save()
            return render(request, 'infoquest/present_student_id_number.html',
                          {
                              'student': instance
                          })
        # if 'ok' in request.POST:
        #     list_of_students = infoquest_student.objects.filter(present=False)
        #     return render(request, 'infoquest/mark_student_presence_infoquest.html',
        #                   {
        #                       'list_of_students': list_of_students
        #                   })

        if 'put_id' in request.POST:
            student_id = request.POST.get('student_id')
            id_number = request.POST.get('id_number')
            student_instance = Infoquest_student.objects.get(id=student_id)
            student_instance.id_number = id_number
            student_instance.save()
            list_of_students = Infoquest_student.objects.filter(present=False)
            return render(request, 'infoquest/mark_student_presence_infoquest.html',
                          {
                              'list_of_students': list_of_students
                          })

        if 'update' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            register_type = request.POST.get('register_type')
            mobile_number = request.POST.get('mobile')
            college_name = request.POST.get('college')
            department = request.POST.get('department')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')
            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.name = name
            instance.gender = gender
            instance.registration_type = register_type
            instance.phone_number = mobile_number
            instance.department = department
            instance.college = college_name
            instance.location = location
            instance.year_of_study = year_of_study
            instance.accommodation = accommodation_needed
            instance.save()
            list_of_students = Infoquest_student.objects.filter(present=False)
            return render(request, 'infoquest/mark_student_presence_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
        if 'edit' in request.POST:
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            return render(request, 'infoquest/edit_information_infoquest.html',
                          {
                              'selected_student': instance
                          })

        if 'get_detail' in request.POST:
            got_student = request.POST.get('email')
            instance = Infoquest_student.objects.get(id=got_student)
            list_of_students = Infoquest_student.objects.filter(present=False)
            return render(request, 'infoquest/mark_student_presence_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
    else:
        list_of_students = Infoquest_student.objects.filter(present=False)

        return render(request, 'infoquest/mark_student_presence_infoquest.html', {'list_of_students': list_of_students})


@login_required
def infoquest_view_present(request):
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.present = False
            instance.save()
            list_of_students = Infoquest_student.objects.filter(present=True).order_by('-entry_time')
            return render(request, 'infoquest/view_present_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance
                          })
    else:
        list_of_students = Infoquest_student.objects.filter(present=True).order_by('-entry_time')
        ppt_students_boys = Infoquest_student.objects.filter(registration_type='P', gender='M', present=True).count()
        event_students_boys = Infoquest_student.objects.filter(registration_type='E', gender='M', present=True).count()
        pptevent_students_boys = Infoquest_student.objects.filter(registration_type='B', gender='M', present=True).count()
        ppt_students_girls = Infoquest_student.objects.filter(registration_type='P', gender='F', present=True).count()
        event_students_girls = Infoquest_student.objects.filter(registration_type='E', gender='F', present=True).count()
        pptevent_students_girls = Infoquest_student.objects.filter(registration_type='B', gender='F', present=True).count()
        ppt_students = ppt_students_boys + ppt_students_girls
        event_students = event_students_boys + event_students_girls
        pptevent_students = pptevent_students_boys + pptevent_students_girls
        boys = Infoquest_student.objects.filter(gender='M', present=True).count()
        girls = Infoquest_student.objects.filter(gender='F', present=True).count()
        accommodation_boys = Infoquest_student.objects.filter(gender='M', accommodation=True, present=True).count()
        accommodation_girls = Infoquest_student.objects.filter(gender='F', accommodation=True, present=True).count()
        accommodation = accommodation_boys + accommodation_girls
        return render(request, 'infoquest/view_present_infoquest.html', {
            'list_of_students': list_of_students,
            'ppt_students_boys': ppt_students_boys,
            'ppt_students_girls': ppt_students_girls,
            'event_students_boys': event_students_boys,
            'event_students_girls': event_students_girls,
            'pptevent_students_boys': pptevent_students_boys,
            'pptevent_students_girls': pptevent_students_girls,
            'accommodation_boys': accommodation_boys,
            'accommodation_girls': accommodation_girls,
            'accommodation': accommodation,
            'boys': boys,
            'girls': girls,
            'total': boys + girls,
            'ppt_students': ppt_students,
            'event_students': event_students,
            'pptevent_students': pptevent_students
        })


@login_required
def infoquest_view_present_ppt(request):
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.present = False
            instance.save()
            list_of_students = Infoquest_student.objects.filter(present=True, registration_type='P').order_by('-entry_time')
            return render(request, 'infoquest/view_present_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance
                          })
    else:
        list_of_students = Infoquest_student.objects.filter(present=True, registration_type='P').order_by('-entry_time')
        return render(request, 'infoquest/view_present_infoquest.html', {'list_of_students': list_of_students})


@login_required
def infoquest_view_present_events(request):
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.present = False
            instance.save()
            list_of_students = Infoquest_student.objects.filter(present=True, registration_type='E').order_by('-entry_time')
            return render(request, 'infoquest/view_present_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance
                          })
    else:
        list_of_students = Infoquest_student.objects.filter(present=True, registration_type='E').order_by('-entry_time')
        return render(request, 'infoquest/view_present_infoquest.html', {'list_of_students': list_of_students})


@login_required
def infoquest_view_present_both(request):
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.present = False
            instance.save()
            list_of_students = Infoquest_student.objects.filter(present=True, registration_type='B').order_by('-entry_time')
            return render(request, 'infoquest/view_present_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance
                          })
    else:
        list_of_students = Infoquest_student.objects.filter(present=True, registration_type='B').order_by('-entry_time')
        return render(request, 'infoquest/view_present_infoquest.html', {'list_of_students': list_of_students})


@login_required
def infoquest_edit_student(request):
    list_of_students = Infoquest_student.objects.all()
    if request.method == 'POST':
        if 'update' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            mobile_number = request.POST.get('mobile')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')
            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            instance.name = name
            instance.gender = gender
            instance.phone_number = mobile_number
            instance.college = college_name
            instance.location = location
            instance.year_of_study = year_of_study
            instance.accommodation = accommodation_needed
            instance.save()
            return render(request, 'infoquest/edit_student_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
        if 'edit' in request.POST:
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            return render(request, 'infoquest/edit_information_infoquest.html',
                          {
                              'selected_student': instance
                          })

        if 'get_detail' in request.POST:
            got_student = request.POST.get('email')
            instance = Infoquest_student.objects.get(id=got_student)
            return render(request, 'infoquest/edit_student_infoquest.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })

    return render(request, 'infoquest/edit_student_infoquest.html', {'list_of_students': list_of_students})


@login_required
def add_infoquest_events(request):
    if request.method == 'POST':
        if 'add' in request.POST:
            got_event_name = request.POST.get('event_name')
            got_rounds = request.POST.get('rounds')
            got_event_name = str(got_event_name).upper()
            event_instance = events(
                event_name=got_event_name,
                rounds=got_rounds,
                order_number=0
            )
            event_instance.save()
            round_counter = 1
            while round_counter <= int(got_rounds):
                round_instance = individual_round(
                    event=event_instance,
                    round=round_counter,
                    order_number=0
                )
                round_instance.save()
                round_counter = round_counter + 1


    events_list = events.objects.all()
    return render(request, 'infoquest/add_infoquest_events.html', {
        'events_list': events_list
    })


@login_required
def view_infoquest_events(request):
    if request.method == 'POST':
        if 'update' in request.POST:
            got_event_id = request.POST.get('event_id')
            event_instance = events.objects.get(id=got_event_id)
            event_instance.timings = request.POST.get('timings')
            event_instance.location = request.POST.get('location')
            event_instance.coordinator_name = request.POST.get('name')
            event_instance.coordinator_phone = request.POST.get('phone')
            event_instance.extra = request.POST.get('extra')
            event_instance.save()
        else:
            avail_events = events.objects.all()
            for each in avail_events:
                if str(request.POST.get(str(each.id))) == 'View':
                    required_edit = int(each.id)
                    break

            event = events.objects.get(id=required_edit)
            return render(request, 'infoquest/edit_infoquest_event.html', {
                'event': event
            })

    events_list = events.objects.all()
    return render(request, 'infoquest/view_infoquest_events.html', {
        'events_list': events_list
    })


def selected_students(request):
    current_user = str(request.user)
    if current_user == 'admin@gct.ac.in':
        events_list = events.objects.all()

    if current_user == 'icon@infoquestgct.com':
        events_list = events.objects.filter(event_name='ICON OF IQ')

    if current_user == 'programming@infoquestgct.com':
        events_list = events.objects.filter(event_name='TECHWIZARD')

    if current_user == 'webdesign@infoquestgct.com':
        events_list = events.objects.filter(event_name='WEBAHOLIC')

    if current_user == 'mastermind@infoquestgct.com':
        events_list = events.objects.filter(event_name='BRAIN DIGGER')

    if current_user == 'quiz@infoquestgct.com':
        events_list = events.objects.filter(event_name='QUIZ')

    if current_user == 'blindcoding@infoquestgct.com':
        events_list = events.objects.filter(event_name='BLIND CODING')

    if current_user == 'eaglefinger@infoquestgct.com':
        events_list = events.objects.filter(event_name='EAGLE FINGER')

    if current_user == 'memecreation@infoquestgct.com':
        events_list = events.objects.filter(event_name='MEME CREATION')

    if current_user == 'connections@infoquestgct.com':
        events_list = events.objects.filter(event_name='CONNECTIONS')

    if current_user == 'designolah@infoquestgct.com':
        events_list = events.objects.filter(event_name='DESIGNOLAH')


    try:
        selected_event = events_list[0].id
        selected_round = 1
    except:
        msg = {
            'page_title': 'No events',
            'title': 'No Events Found',
            'description': 'Add events first to shortlist students for next round'
        }
        return render(request, 'prompt_pages/error_page_base.html', {'message': msg})
    if request.method == 'POST':
        if 'event' in request.POST:
            selected_event = int(request.POST.get('event'))

        elif 'round_tab' in request.POST:
            selected_round = str(request.POST.get('round_tab'))
            selected_round = int(selected_round[1])
            selected_event = int(request.POST.get('event_tab'))

        elif 'add' in request.POST:
            selected_event = int(request.POST.get('selected_event'))
            selected_round = int(request.POST.get('selected_round'))
            student = request.POST.get('email')

            student_instance = Infoquest_student.objects.get(id=student)
            event_instance = events.objects.get(id=selected_event)

            if not shortlisted_candidates.objects.filter(event=event_instance, round=selected_round,
                                                         student=student_instance):
                shortlisted_candidates_instance = shortlisted_candidates(
                    event=event_instance,
                    round=selected_round,
                    student=student_instance
                )
                shortlisted_candidates_instance.save()

        else:
            selected_event = int(request.POST.get('revoke_event'))
            selected_round = int(request.POST.get('revoke_round'))
            event_instance = events.objects.get(id=selected_event)
            avail_students = shortlisted_candidates.objects.filter(event=event_instance, round=selected_round)

            for each in avail_students:
                if str(request.POST.get(str(each.id))) == 'Revoke':
                    shortlisted_candidates.objects.filter(id=each.id).delete()

    event_instance = events.objects.get(id=selected_event)
    rounds = []

    i = 1
    while i <= event_instance.rounds:
        rounds.append(i)
        i = i + 1

    shortlisted_students = shortlisted_candidates.objects.filter(event=event_instance, round=selected_round)

    if int(selected_round) == 1:
        available_students = Infoquest_student.objects.filter(present=True).exclude(registration_type='P')
        list_of_students = []
        for student in available_students:
            if not shortlisted_candidates.objects.filter(event=event_instance, round=selected_round, student=student):
                list_of_students.append(student)
    else:
        previous_round = int(selected_round) - 1
        available_students = Infoquest_student.objects.filter(present=True).exclude(registration_type='P')
        list_of_students = []
        for student in available_students:
            if shortlisted_candidates.objects.filter(event=event_instance, round=previous_round, student=student):
                if not shortlisted_candidates.objects.filter(event=event_instance, round=selected_round,
                                                             student=student):
                    list_of_students.append(student)

    return render(request, 'infoquest/selected_students.html', {
        'events_list': events_list,
        'selected_event': selected_event,
        'rounds': rounds,
        'selected_round': int(selected_round),
        'list_of_students': list_of_students,
        'shortlisted_students': shortlisted_students
    })


"""
def selected_list(request):
    events_list = events.objects.all()
    try:
        selected_event = events_list[0].id
        selected_round = 1
    except:
        msg = {
            'page_title': 'No events',
            'title': 'No Events Found',
            'description': 'Add events first to shortlist students for next round'
        }
        return render(request, 'prompt_pages/error_page_base.html', {'message': msg})
    if request.method == 'POST':
        if 'event' in request.POST:
            selected_event = int(request.POST.get('event'))
        if 'round' in request.POST:
            selected_round = str(request.POST.get('round'))
            selected_round = selected_round[1]
            selected_event = int(request.POST.get('event_tab'))

    event_instance = events.objects.get(id=selected_event)
    rounds = []

    i = 1
    while i <= event_instance.rounds:
        rounds.append(i)
        i = i + 1

    return render(request, 'infoquest/selected_students.html', {
        'events_list': events_list,
        'selected_event': selected_event,
        'rounds': rounds,
        'selected_round': int(selected_round)
    })
"""


def infoquest_query(request):
    list_of_students = queries.objects.all()
    return render(request, 'infoquest/infoquest_queries.html',
                  {
                      'list_of_students': list_of_students
                  })


@login_required
def infoquest_ppt_submitted(request):
    list_of_students = []
    if request.method == 'POST':
        if 'submit' in request.POST:
            got_student = request.POST.get('student')
            instance = Infoquest_student.objects.get(id=got_student)
            ppt_instance = ppt(student=instance, mail_status=False)
            ppt_instance.save()
            list_of_students = []
            for student in Infoquest_student.objects.all():
                if not ppt.objects.filter(student=student):
                    list_of_students.append(student)
            return render(request, 'infoquest/ppt_submitted.html',
                          {
                              'list_of_students': list_of_students,
                              'present_student': instance
                          })

        if 'get_detail' in request.POST:
            got_student = request.POST.get('email')
            instance = Infoquest_student.objects.get(id=got_student)
            list_of_students = []
            for student in Infoquest_student.objects.all():
                if not ppt.objects.filter(student=student):
                    list_of_students.append(student)
            return render(request, 'infoquest/ppt_submitted.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
    else:
        for student in Infoquest_student.objects.all():
            if not ppt.objects.filter(student=student):
                list_of_students.append(student)

    return render(request, 'infoquest/ppt_submitted.html', {'list_of_students': list_of_students})


@login_required
def infoquest_view_ppt_submitted(request):
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            instance = ppt.objects.get(id=got_student)
            ppt.objects.filter(id=got_student).delete()
            list_of_students = ppt.objects.all()
            return render(request, 'infoquest/view_ppt_submitted.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance.student.name
                          })
    else:
        list_of_students = ppt.objects.all()

        return render(request, 'infoquest/view_ppt_submitted.html', {'list_of_students': list_of_students})


@login_required
def result_display_order(request):
    if request.method == 'POST':
        if 'submit' in request.POST:
            available_events = individual_round.objects.all().exclude(round=1)
            order_list = []
            for event in available_events:
                order = int(request.POST.get('order'+str(event.id)))
                if order != 0:
                    order_list.append(order)

            another_list = []
            for each in order_list:
                if each not in another_list:
                    another_list.append(each)
                else:
                    return render(request, 'infoquest/result_display_order.html',
                                  {
                                      'events_list': available_events,
                                      'error': True
                                  })
            for event in available_events:
                enabler = request.POST.get('enable'+str(event.id))
                order = request.POST.get('order'+str(event.id))
                event_instance = individual_round.objects.get(id=event.id)
                event_instance.order_number = order
                if enabler == '1' and int(order) > 0:
                    event_instance.result_enable = True
                else:
                    event_instance.result_enable = False
                event_instance.save()

    events_list = []
    for event in individual_round.objects.exclude(order_number=0).exclude(round=1).order_by('order_number'):
        events_list.append(event)
    for event in individual_round.objects.filter(order_number=0).exclude(round=1):
        events_list.append(event)

    return render(request, 'infoquest/result_display_order.html', {
        'events_list': events_list
    })