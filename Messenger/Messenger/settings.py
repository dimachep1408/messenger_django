"""
Django settings for Messenger project.

Generated by 'django-admin startproject' using Django 5.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.2/ref/settings/
"""

from pathlib import Path
from django.urls import reverse_lazy
from dotenv import load_dotenv
import os
import environ 
from sshtunnel import SSHTunnelForwarder

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-k-3@lfw^skz6bi9zaq&u4^1gxpf_f2pifm2f)%14+j_*^i=vpp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "daphne",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user_app',
    "main",
    "post_app",
    "settings_app",
    "friends",
    "options",
    "chat_app"
]

# Шлях до об'єкту application, який обробляє асинхронні запити
ASGI_APPLICATION = 'Messenger.asgi.application'

# Створюємо константу, яка вказує як будуть оброблятися дані каналів
CHANNEL_LAYERS = {
    # Створюємо канал, на якому знаходиться користувач по замовчуванню
    "default":{
        # Вказуємо, що інформація про усі з'єднання зберігається в пам'яті комп'ютера
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ENV_DIR = Path(__file__).resolve().parent.parent.parent 
environ.Env.read_env(ENV_DIR / '.env')
load_dotenv(ENV_DIR / '.env')

ROOT_URLCONF = 'Messenger.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates/"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

username = os.getenv('DB_CONNECT_USERNAME')
password = os.getenv('DB_CONNECT_PASSWORD')
password_db = os.getenv("DB_PASSWORD")

server = SSHTunnelForwarder(
    ('ssh.pythonanywhere.com', 22),
    ssh_username=f'{username}',
    ssh_password=f'{password}',  # Рекомендуется использовать ключ
    remote_bind_address=(f'{username}.mysql.pythonanywhere-services.com', 3306)
)

server.start()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': f'{username}$default',
        'USER': f'{username}',
        'PASSWORD': f'{password_db}',
        'HOST': f'/{username}/mysql/pythonanywhere-services.com',
        'PORT': str(server.local_bind_port),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media/"

LOGIN_REDIRECT_URL = reverse_lazy("main")


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER') # e-mail
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD') # e-mail app password 

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'user_app.backends.LoginEmail', 
]