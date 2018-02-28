from django.conf.urls import url
from Infoquest.views import *


urlpatterns = [

    url(r'^infoquest_queries/$', infoquest_query, name='infoquest_queries'),

url(r'^iq_verify_transaction/$', iq_verify_transaction, name='iq_verify_transaction'),
    url(r'^iq_paid/$', iq_paid, name='iq_paid'),
    url(r'^view_registered_infoquest/$', infoquest_students_registered, name='infoquest_registered'),
    url(r'^view_unverified_infoquest/$', infoquest_students_unverified, name='infoquest_unverified'),
    url(r'^on_spot_registrations_infoquest/$', infoquest_on_spot, name='infoquest_on_spot'),
    url(r'^view_total_students_entry_infoquest/$', infoquest_total_students_entry, name='infoquest_total_students'),

    url(r'^pdf_view_registered_infoquest/$',infoquest_RegisteredPDF.as_view() , name='infoquest_registered_pdf'),
    url(r'^pdf_view_unverified_infoquest/$',infoquest_UnVerifiedPDF.as_view() , name='infoquest_unverified_pdf'),
    url(r'^pdf_view_on_spot_infoquest/$',infoquest_OnspotPDF.as_view() , name='infoquest_onspot_pdf'),
    url(r'^pdf_view_total_students_infoquest/$',infoquest_TotalStudentsPDF.as_view() , name='infoquest_total_students_pdf'),

    url(r'^add_students_infoquest/$', add_students_infoquest, name='add_students_infoquest'),
    url(r'^edit_student_infoquest/$', infoquest_edit_student, name='edit_student_infoquest'),

    url(r'^mark_student_presence_infoquest/$', infoquest_mark_student_presence, name='mark_student_infoquest'),
    url(r'^view_present_students_infoquest/$', infoquest_view_present, name='view_present_infoquest'),
    url(r'^view_present_students_infoquest_ppt/$', infoquest_view_present_ppt, name='ppt_present'),
    url(r'^view_present_students_infoquest_events/$', infoquest_view_present_events, name='event_present'),
    url(r'^view_present_students_infoquest_both/$', infoquest_view_present_both, name='both_present'),


    url(r'^add_infoquest_events/$', add_infoquest_events, name='add_infoquest_events'),
    url(r'^view_infoquest_events/$', view_infoquest_events, name='view_infoquest_events'),


    url(r'^shortlist_students/$', selected_students, name='selected_students'),


    url(r'^mark_ppt_submitted_student/$', infoquest_ppt_submitted, name='infoquest_ppt_submiited'),
    url(r'^view_ppt_submitted_student/$', infoquest_view_ppt_submitted, name='infoquest_view_ppt_submitted'),


    url(r'^result_display_order/$', result_display_order, name='result_display_order'),

    url(r'^boys_accommodation_infoquest/$', infoquest_boys_accommodation, name='infoquest_boys'),
    url(r'^girls_accommodation_infoquest/$', infoquest_girls_accommodation, name='infoquest_girls'),

    url(r'^pdf_boys_accommodation_infoquest/$', infoquest_boys_PDF.as_view(), name='infoquest_boys_accommodation'),
    url(r'^pdf_girls_accommodation_infoquest/$', infoquest_girls_PDF.as_view(), name='infoquest_girls_accommodation'),

]