from .settings import *

DEBUG = False

ALLOWED_HOSTS = ['*']

ADMINS = (
    ('Kavin', 'kavinskp@gmail.com'),
)

MANAGERS = (
    ('Kavin', 'kavinskp@gmail.com'),
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'infoquest_production',
        'USER': 'infoquest_user',
        'PASSWORD': 'root_user_infoquest',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"}
    }
}

CURRENT_HOST_NAME = 'http://infoquestgct.com/'
