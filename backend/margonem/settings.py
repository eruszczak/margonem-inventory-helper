import os
import json
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKUP_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'backup')
EXCLUDED_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'excluded')

DEBUG = os.environ['DEBUG'] == 'True'
SECRET_KEY = os.environ['SECRET_KEY']
ALLOWED_HOSTS = json.loads(os.environ['ALLOWED_HOSTS'])

print(os.environ.items())

DATABASES = {
    'default': dj_database_url.parse(os.environ['DATABASE_URL'])
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_swagger',

    'items.apps.ItemsConfig',

    'django.contrib.postgres'  # for unaccent
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'margonem.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'margonem.wsgi.application'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.environ.get('STATIC_ROOT', os.path.join(os.path.dirname(BASE_DIR), 'static'))

MEDIA_URL = "/media/"
MEDIA_ROOT = os.environ.get('MEDIA_ROOT', os.path.join(os.path.dirname(BASE_DIR), 'media'))

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}
if DEBUG:
    from .settings_local import *
else:
    from .settings_production import *
