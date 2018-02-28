from django.conf.urls import url
from Registrations.views import index, signup, userlogin, userlogout, homepagelogout, cancel, activation, changepass, workshop, iq
from Registrations.views import *


urlpatterns = [

    url(r'^$', index, name = "index"),
    url(r'^Workshop2k18/$', workshop, name = "workshop"),
    url(r'^IQ2k18/$', iq, name = "iq"),


    url(r'^IQ2k18/events/$', events, name = "iq_events"),
    url(r'^IQ2k18/sponsor/$', contact, name = "iq_contact"),
    url(r'^IQ2k18/payment/$', payment, name = "iq_payment"),
    url(r'^IQ2k18/registration/$', register, name = "iq_register"),
    url(r'^IQ2k18/results/$', result, name = "iq_result"),

    url(r'^IQ2k18/single/$', single, name = "single"),


    url(r'^IQ2k18/Paper_exposit/$', ppt, name = "ppt"),
    url(r'^IQ2k18/Icon_of_IQ/$', icon, name = "icon"),
    url(r'^IQ2k18/Techwizard/$', programming, name = "programming"),
    url(r'^IQ2k18/Webaholic/$', web_design, name = "web_design"),
    url(r'^IQ2k18/Brain_digger/$', master_mind, name = "master_mind"),
    url(r'^IQ2k18/Quiz/$', quiz, name = "quiz"),


    url(r'^IQ2k18/Blind_coding/$', blind_coding, name = "blind_coding"),
    url(r'^IQ2k18/Eagle_finger/$', eagle_finger, name = "eagle_finger"),
    url(r'^IQ2k18/Meme_creation/$', meme_creation, name = "meme_creation"),
    url(r'^IQ2k18/Debugging/$', debugging, name = "debugging"),
    url(r'^IQ2k18/Marketing/$', marketing, name="marketing"),



    url(r'^IQ2k18/Gaming/$', gaming, name = "gaming"),
    url(r'^IQ2k18/DataStructures/$', datastructure, name = "datastructures"),
    url(r'^IQ2k18/DataBase/$', database, name="database"),
    url(r'^IQ2k18/Online_Photography/$', photography, name = "photography"),



    url(r'^workshop_registration/$', signup, name="signup"),
    url(r'^infoquest_registration/$', infoquest_signup, name = "infoquest_signup"),
    url(r'^userloginasadmin/$', userlogin, name = "login"),
    url(r'^homelogout/$',homepagelogout,name = "homelogout"),
    url(r'^logout/$', userlogout, name = "logout"),
    url(r'^login/cancel/$', cancel, name="cancel"),
    url(r'^changepass/$',changepass,name = "changepass"),

    url(r'^confirm_registeration_workshop/(?P<key>.+)/$',activation,name='activation'),
    url(r'^confirm_registeration_infoquest/(?P<key>.+)/$',activation_infoquest,name='activation_infoquest'),

]
