from django.conf.urls import url
from workshop.views import workshop_students_registered, workshop_students_unverified, workshop_RegisteredPDF, workshop_UnVerifiedPDF,workshop_PaidPDF
from workshop.views import add_students_workshop, workshop_on_spot, workshop_OnspotPDF
from workshop.views import workshop_mark_student_presence, workshop_view_present
from workshop.views import workshop_total_students_entry, workshop_TotalStudentsPDF
from workshop.views import *


urlpatterns = [

    url(r'^workshop_queries/$', workshop_query, name='workshop_queries'),
    url(r'^verify_transaction/$', verify_transaction, name='verify_transaction'),
    url(r'^workshop_paid/$', workshop_paid, name='workshop_paid'),
    url(r'^view_registered_workshop/$', workshop_students_registered, name='workshop_registered'),
    url(r'^view_unverified_workshop/$', workshop_students_unverified, name='workshop_unverified'),
    url(r'^on_spot_registrations_workshop/$', workshop_on_spot, name='workshop_on_spot'),
    url(r'^view_total_students_entry_workshop/$', workshop_total_students_entry, name='workshop_total_students'),
    url(r'^pdf_view_paid_workshop/$',workshop_PaidPDF.as_view() , name='workshoppaidpdf'),
    url(r'^pdf_view_registered_workshop/$',workshop_RegisteredPDF.as_view() , name='workshopregisteredpdf'),
    url(r'^pdf_view_unverified_workshop/$',workshop_UnVerifiedPDF.as_view() , name='workshopunverifiedpdf'),
    url(r'^pdf_view_on_spot_workshop/$',workshop_OnspotPDF.as_view() , name='workshoponspotpdf'),
    url(r'^pdf_view_total_students_workshop/$',workshop_TotalStudentsPDF.as_view() , name='workshop_total_students_pdf'),

    url(r'^add_students_workshop/$', add_students_workshop, name='add_students_workshop'),
    url(r'^edit_student_workshop/$', workshop_edit_student, name='edit_student_workshop'),


    url(r'^mark_student_presence_workshop/$', workshop_mark_student_presence, name='mark_student_workshop'),
    url(r'^view_present_students_workshop/$', workshop_view_present, name='view_present_workshop'),


    url(r'^boys_accommodation_workshop/$', workshop_boys_accommodation, name='workshop_boys'),
    url(r'^girls_accommodation_workshop/$', workshop_girls_accommodation, name='workshop_girls'),

    url(r'^pdf_boys_accommodation_workshop/$',workshop_boys_PDF.as_view(), name='workshop_boys_accommodation'),
    url(r'^pdf_girls_accommodation_workshop/$',workshop_girls_PDF.as_view(), name='workshop_girls_accommodation'),

]
