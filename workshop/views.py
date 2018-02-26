from django.utils import timezone
from django.utils.crypto import random
import hashlib
from Registrations.send_mail import sendEmail

from pprint import pprint

from django.shortcuts import render

from django.contrib.auth.decorators import login_required
from easy_pdf.views import PDFTemplateView

from Registrations.models import workshop_student
from workshop.models import workshop_queries


@login_required
def workshop_total_students_entry(request):
    list_of_students = workshop_student.objects.filter(present=True).order_by('college', 'name')
    boys = workshop_student.objects.filter(gender='M')
    boys = len(boys)
    conf = workshop_student.objects.filter(conf_tr_id=True)
    conf = len(conf)
    girls = workshop_student.objects.filter(gender='F')
    girls = len(girls)
    accommodation_boys = workshop_student.objects.filter(gender='M', accommodation=True)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = workshop_student.objects.filter(gender='F', accommodation=True)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'workshop/view_total_students_workshop.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'conf':conf,
        'total': boys + girls
    })


@login_required
def workshop_students_registered(request):
    list_of_students = workshop_student.objects.filter(mail_verified=True, on_spot=False).order_by('-time_created')
    boys = workshop_student.objects.filter(gender='M', mail_verified=True, on_spot=False)
    boys = len(boys)
    girls = workshop_student.objects.filter(gender='F', mail_verified=True, on_spot=False)
    girls = len(girls)
    conf = workshop_student.objects.filter(conf_tr_id=True)
    conf = len(conf)
    accommodation_boys = workshop_student.objects.filter(gender='M', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = workshop_student.objects.filter(gender='F', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'workshop/view_registered_workshop.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'conf': conf,
        'total': boys + girls
    })


@login_required
def workshop_students_unverified(request):
    list_of_students = workshop_student.objects.filter(mail_verified=False, on_spot=False).order_by('-time_created')
    boys = workshop_student.objects.filter(gender='M', mail_verified=False, on_spot=False)
    boys = len(boys)
    girls = workshop_student.objects.filter(gender='F', mail_verified=False, on_spot=False)
    girls = len(girls)
    conf = workshop_student.objects.filter(conf_tr_id=True)
    conf = len(conf)
    accommodation_boys = workshop_student.objects.filter(gender='M', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = workshop_student.objects.filter(gender='F', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'workshop/view_unverified_workshop.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'conf': conf,
        'boys': boys,
        'girls': girls,
        'total': boys + girls
    })


@login_required
def workshop_on_spot(request):
    list_of_students = workshop_student.objects.filter(on_spot=True).order_by('-time_created')
    boys = workshop_student.objects.filter(gender='M', on_spot=True)
    boys = len(boys)
    girls = workshop_student.objects.filter(gender='F', on_spot=True)
    girls = len(girls)
    conf = workshop_student.objects.filter(conf_tr_id=True)
    conf = len(conf)
    accommodation_boys = workshop_student.objects.filter(gender='M', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = workshop_student.objects.filter(gender='F', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'workshop/on_spot_workshop.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'conf':conf,
        'girls': girls,
        'total': boys + girls
    })


@login_required
def workshop_paid(request):
    list_of_students = workshop_student.objects.filter(conf_tr_id=True).order_by('-time_created')
    boys = workshop_student.objects.filter(gender='M', conf_tr_id=True)
    boys = len(boys)
    girls = workshop_student.objects.filter(gender='F', conf_tr_id=True)
    girls = len(girls)
    accommodation_boys = workshop_student.objects.filter(gender='M', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_boys = len(accommodation_boys)
    accommodation_girls = workshop_student.objects.filter(gender='F', accommodation=True, mail_verified=True, on_spot=False)
    accommodation_girls = len(accommodation_girls)

    return render(request, 'workshop/paid_workshop.html', {
        'list_of_students': list_of_students,
        'accommodation_boys': accommodation_boys,
        'accommodation_girls': accommodation_girls,
        'boys': boys,
        'girls': girls,
        'total': boys + girls
    })

@login_required
def workshop_boys_accommodation(request):
    list_of_students = workshop_student.objects.filter(accommodation=True, gender='M').order_by('-time_created')

    return render(request, 'workshop/workshop_boys_accommodation.html', {
        'list_of_students': list_of_students
    })

@login_required
def workshop_girls_accommodation(request):
    list_of_students = workshop_student.objects.filter(accommodation=True, gender='F').order_by('-time_created')

    return render(request, 'workshop/workshop_girls_accommodation.html', {
        'list_of_students': list_of_students
    })



@login_required
def workshop_pdf_total_students_entry(request):
    list_of_students = workshop_student.objects.all().filter(present=True).order_by('college', 'name')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def workshop_pdf_students_registered(request):
    list_of_students = workshop_student.objects.filter(mail_verified=True, on_spot=False)

    context_data = {
        'student_list': list_of_students
    }

    return context_data



@login_required
def workshop_pdf_students_paid(request):
    list_of_students = workshop_student.objects.filter(conf_tr_id=True).order_by('-time_created')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def workshop_pdf_students_unverified(request):
    list_of_students = workshop_student.objects.filter(mail_verified=False, on_spot=False)

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def workshop_pdf_students_onspot(request):
    list_of_students = workshop_student.objects.filter(on_spot=True)

    context_data = {
        'student_list': list_of_students
    }

    return context_data

@login_required
def workshop_pdf_boys_accommodation(request):
    list_of_students = workshop_student.objects.filter(accommodation=True, gender='M')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


@login_required
def workshop_pdf_girls_accommodation(request):
    list_of_students = workshop_student.objects.filter(accommodation=True, gender='F')

    context_data = {
        'student_list': list_of_students
    }

    return context_data


class workshop_TotalStudentsPDF(PDFTemplateView):
    template_name = "workshop/total_students_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_TotalStudentsPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_total_students_entry(self.request)
        return super(workshop_TotalStudentsPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_RegisteredPDF(PDFTemplateView):
    template_name = "workshop/registered_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_RegisteredPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_students_registered(self.request)
        return super(workshop_RegisteredPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_PaidPDF(PDFTemplateView):
    template_name = "workshop/paid_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_PaidPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_students_paid(self.request)
        return super(workshop_PaidPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_UnVerifiedPDF(PDFTemplateView):
    template_name = "workshop/unverified_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_UnVerifiedPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_students_unverified(self.request)
        return super(workshop_UnVerifiedPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_OnspotPDF(PDFTemplateView):
    template_name = "workshop/onspot_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_OnspotPDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_students_onspot(self.request)
        return super(workshop_OnspotPDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_boys_PDF(PDFTemplateView):
    template_name = "workshop/boys_accommodation_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_boys_PDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_boys_accommodation(self.request)
        return super(workshop_boys_PDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )


class workshop_girls_PDF(PDFTemplateView):
    template_name = "workshop/girls_accommodation_workshop_pdf.html"

    def get(self, request, *args, **kwargs):
        return super(workshop_girls_PDF, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context_data = workshop_pdf_girls_accommodation(self.request)
        return super(workshop_girls_PDF, self).get_context_data(
            pagesize="A4",
            context=context_data,
            **kwargs
        )



@login_required
def add_students_workshop(request):
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
            accommodation = request.POST.get('accommodation')

            if workshop_student.objects.filter(email=email):
                return render(request, 'prompt_pages/registered_mail.html', {'email': email})

            if workshop_student.objects.filter(phone_number=mobile_number):
                return render(request, 'prompt_pages/registered_phone.html', {'phone': mobile_number})
 
            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True

            instance = workshop_student(
                name=name,
                gender=gender,
                email=email,
                phone_number=mobile_number,
                department=department_name,
                college=college_name,
                location=location,
                year_of_study=year_of_study,
                accommodation=accommodation_needed,
                on_spot=on_spot,
                present=True,
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

            # pprint(instance)
            instance.save()

            # print(vars(temp))

            datas = {}
            datas['email'] = email
            datas['activation_key'] = key

            #sendEmail(datas)
            return render(request, "workshop/add_students_workshop.html", {'add': True})

    return render(request, "workshop/add_students_workshop.html",{})


@login_required
def workshop_mark_student_presence(request):
    list_of_students = workshop_student.objects.filter(present=False)
    if request.method == 'POST':
        if 'present' in request.POST:
            got_student = request.POST.get('student')
            instance = workshop_student.objects.get(id=got_student)
            instance.present = True
            instance.save()
            return render(request, 'workshop/mark_student_presence_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'present_student': instance
                          })

        if 'get_detail' in request.POST:
            got_student = request.POST.get('email')
            instance = workshop_student.objects.get(id=got_student)
            return render(request, 'workshop/mark_student_presence_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })

        if 'update' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            mobile_number = request.POST.get('mobile')
            department = request.POST.get('department')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')
            transaction_id = request.POST.get('transaction_id')
            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True
            got_student = request.POST.get('student')
            instance = workshop_student.objects.get(id=got_student)
            instance.name = name
            instance.gender = gender
            instance.phone_number = mobile_number
            instance.department = department
            instance.college = college_name
            instance.location = location
            instance.year_of_study = year_of_study
            instance.accommodation = accommodation_needed
            instance.transaction_id=transaction_id
            if transaction_id=='' or transaction_id=='None':
                instance.on_spot=True
            else:
                instance.on_spot=False
            instance.save()
            return render(request, 'workshop/mark_student_presence_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
        if 'edit' in request.POST:
            got_student = request.POST.get('student')
            instance = workshop_student.objects.get(id=got_student)
            return render(request, 'workshop/edit_information_workshop.html',
                          {
                              'selected_student': instance
                          })

    return render(request, 'workshop/mark_student_presence_workshop.html', {'list_of_students': list_of_students})


@login_required
def workshop_view_present(request):
    list_of_students = workshop_student.objects.filter(present=True)
    if request.method == 'POST':
        if 'absent_student' in request.POST:
            got_student = request.POST.get('absent_student')
            print(got_student)
            instance = workshop_student.objects.get(id=got_student)
            instance.present = False
            instance.save()

            return render(request, 'workshop/view_present_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'absent_student': instance
                          })

    return render(request, 'workshop/view_present_workshop.html', {'list_of_students': list_of_students})


@login_required
def workshop_edit_student(request):
    list_of_students = workshop_student.objects.all()
    if request.method == 'POST':
        if 'update' in request.POST:
            name = request.POST.get('name')
            gender = request.POST.get('gender')
            mobile_number = request.POST.get('mobile')
            department = request.POST.get('department')
            college_name = request.POST.get('college')
            location = request.POST.get('location')
            year_of_study = request.POST.get('year')
            accommodation = request.POST.get('accommodation')
            transaction_id = request.POST.get('transaction_id')
            
            accommodation_needed = False
            if accommodation == 'Y':
                accommodation_needed = True
            got_student = request.POST.get('student')
            instance = workshop_student.objects.get(id=got_student)
            instance.name = name
            instance.gender = gender
            instance.phone_number = mobile_number
            instance.department = department
            instance.college = college_name
            instance.location = location
            instance.year_of_study = year_of_study
            instance.transaction_id = transaction_id
            instance.accommodation = accommodation_needed
            if transaction_id=='' or transaction_id=='None':
                instance.on_spot=True
            else:
                instance.on_spot=False
            instance.save()
            return render(request, 'workshop/edit_student_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })
        if 'edit' in request.POST:
            got_student = request.POST.get('student')
            instance = workshop_student.objects.get(id=got_student)
            return render(request, 'workshop/edit_information_workshop.html',
                          {
                              'selected_student': instance
                          })

        if 'get_detail' in request.POST:
            got_student = request.POST.get('email')
            instance = workshop_student.objects.get(id=got_student)
            return render(request, 'workshop/edit_student_workshop.html',
                          {
                              'list_of_students': list_of_students,
                              'student': instance
                          })

    return render(request, 'workshop/edit_student_workshop.html', {'list_of_students': list_of_students})


def workshop_query(request):
    list_of_students = workshop_queries.objects.all()
    return render(request, 'workshop/workshop_queries.html',
                  {
                      'list_of_students': list_of_students
                  })

def verify_transaction(request):
    list_of_students = workshop_student.objects.all()
    return render(request, 'workshop/verify_transaction.html',
                  {
                      'list_of_students': list_of_students
                  })
