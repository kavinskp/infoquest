"""
Django settings for InfoQuest project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '$3%g=uw0hj_ig&^g=)n(&!2@#l5#0!&f=^1rkdjp*!^uj%e1ti'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'Registrations',
    'dashboard',
    'workshop',
    'iq',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

]


LOGIN_URL = '/userloginasadmin/'
LOGIN_REDIRECT_URL = '/dashboard/'

AUTH_USER_MODEL = 'Registrations.customUser'
AUTHENTICATION_BACKENDS = ('Registrations.backends.CustomUserAuth', 'django.contrib.auth.backends.ModelBackend')

# for mailing
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 25
EMAIL_HOST_USER = 'infoquestws18@gmail.com'  # your gmail id for testing purpose
EMAIL_HOST_PASSWORD = 'csea1418'  # gmail id password
DEFAULT_FROM_EMAIL = 'infoquestws@gmail.com'  # your gmail id for testing purpose
SERVER_EMAIL = 'infoquestws@gmail.com'  # your gmail id for testing purpose


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'InfoQuest.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'InfoQuest.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

ADMINS = (
    ('Kavin', 'kavinskp@gmail.com'),
)

MANAGERS = (
    ('Kavin', 'kavinskp@gmail.com'),
)

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'infoquest_production',
#         'USER': 'infoquest_user',
#         'PASSWORD': 'root_user_infoquest',
#         'HOST': '127.0.0.1',
#         'PORT': '3306',
#         'OPTIONS': {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"}
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'iq_db',
        'USER': 'iq_user',
        'PASSWORD': 'server#1234',
        'HOST': 'localhost',
        'PORT': '',                      # Set to empty string for default.
    }
}

CURRENT_HOST_NAME = 'http://infoquestgct.com/'


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static/")

