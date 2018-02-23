from django.core.mail import send_mail

from InfoQuest import settings


# def sendEmail_Registration_Workshop(user_data):
#     subject = user_data['name'] + ' @ Workshop Registration'
#     message = '\nName:' + user_data['name'] + \
#               '\nGender:' + user_data['gender'] + \
#               '\nEmail:' + user_data['email'] + \
#               '\nPhone_number:' + user_data['phone_number'] + \
#               '\nDepartment:' + user_data['department'] + \
#               '\nCollege:' + user_data['college'] + \
#               '\nLocation:' + user_data['location'] + \
#               '\nYear_of_study:' + user_data['year_of_study'] + \
#               '\nAccomodation:' + user_data['accommodation'] + \
#               '\nTime:' + user_data['time_created']
#     from_email = settings.EMAIL_HOST_USER
#     send_mail(subject, message, from_email, user_data, fail_silently=False)


def sendEmail(datas):
    link = 'https://infoquestgct.com/confirm_registeration_workshop/' + datas['activation_key']
    subject = 'Workshop @ GCT -  Registration Confirmation'
    message = 'Hi ' + str(datas['name']).title() + ',' \
              '\n' \
              'We welcome you to the ' \
              'Workshop Data Science in Python\n' \
              'Workshop Date: 12.03.2018\n' \
              'Time: 09:00 AM' \
              '\n\nClick the following link to confirm your registration ' + link + \
              '\n\n' \
              'Now InfoQuest on youtube!' \
              '\nSubscribe our Youtube channel \'Infoquest Gct\' else, use link: https://www.youtube.com/channel/UCOqCQ818UlIGXtXFa-mSMhw' \
              '\nStart Subscribing our channel now for more videos.' \
              '\n\n' \
              'And We glad to say our symposium InfoQuest \'18 on 23th & 24th March and we also expect your presence to InfoQuest \'18' \
              '\nRegister now at https://infoquestgct.com' \
              '\n\nHave a great day!' \
              '\nFor more information, visit our website: https://infoquestgct.com' \
              '\nFacebook page - https://www.facebook.com/infoquest18/' \
              '\nFeel free to ask queries \nMail us at: workshop@infoquestgct.com' \
              '\n\n' \
              'Regards,\n' \
              '\tInfoquest Team\n' \
              '\tCSEA - GCT\n'

    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, message, from_email, [datas['email']], fail_silently=False)


def sendEmail_Registration_Infoquest(user_data):
    subject = user_data['name'] + ' @ ' + user_data['register_type'] + ' - InfoQuest Registration'
    message = '\nName:' + user_data['name'] + \
              '\nGender:' + user_data['gender'] + \
              '\nRegister type:' + user_data['register_type'] + \
              '\nEmail:' + user_data['email'] + \
              '\nPhone_number:' + user_data['phone_number'] + \
              '\nCollege:' + user_data['college'] + \
              '\nDepartment:' + user_data['department'] + \
              '\nLocation:' + user_data['location'] + \
              '\nYear_of_study:' + user_data['year_of_study'] + \
              '\nAccomodation:' + user_data['accommodation'] + \
              '\nTime:' + user_data['time_created']
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, message, from_email, ['infoquest17.ultrons@gmail.com'], fail_silently=False)


def sendEmail_Infoquest(datas):
    link = 'https://infoquestgct.com/confirm_registeration_infoquest/' + datas['activation_key']
    subject = 'InfoQuest @ GCT -  Registration Confirmation'
    message = 'Hi ' + str(datas['name']).title() + ',' \
              '\n' \
              'We welcome you to the ' \
              'InfoQuest \'18 ' + datas['content'] + '\n' \
              'Event Date: '+ datas['date'] +'\n' \
              'Time: 09:00 AM' \
              '\n\nClick the following link to confirm your registration ' + link + \
              '\n\n' \
              'Now InfoQuest on youtube!' \
              '\nSubscribe our Youtube channel \'Infoquest Gct\' else, use link: https://www.youtube.com/channel/UCOqCQ818UlIGXtXFa-mSMhw' \
              '\nStart Subscribing our channel now for more videos.' \
              '\n\n' \
              'And We glad to present a one day Workshop Data Science in Python on 12th March and we also expect your presence to our workshop' \
              '\nRegister now at https://infoquestgct.com' \
              '\n\nHave a great day!' \
              '\n\n' \
              '\nFor more information, visit our website: https://infoquestgct.com' \
              '\nFacebook page - https://www.facebook.com/infoquest18/' \
              '\n\n' \
              'Regards,\n' \
              '\tInfoquest Team\n' \
              '\tCSEA - GCT\n'
    from_email = settings.EMAIL_HOST_USER
    send_mail(subject, message, from_email, [datas['email']], fail_silently=False)
