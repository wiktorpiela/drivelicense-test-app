from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ["SECRET_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["https://drive-license-exam-app.up.railway.app/"]
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "rest_framework",
    "django_cron",
    "rest_framework.authtoken",
    "testapp",
    "accounts",
    "corsheaders",
    "cloudinary_storage",
    "cloudinary",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'drivelicense.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'drivelicense.wsgi.application'

if DEBUG:
    CURRENT_DOMAIN = "http://127.0.0.1:8000/"
else:
    CURRENT_DOMAIN = "https://drive-license-exam-app.up.railway.app"    


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

if DEBUG == False: #use postgresql in production
		DATABASES = {
		    'default': {
		        'ENGINE': 'django.db.backends.postgresql',
		        'NAME': os.environ["PGDATABASE"],
		        'USER': os.environ["PGUSER"],
		        'PASSWORD': os.environ["PGPASSWORD"],
		        'HOST': os.environ["PGHOST"],
		        'PORT': os.environ["PGPORT"],
		    }
		}
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 9,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'pl'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_ROOT = BASE_DIR / 'staticfiles'

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / "static", 
    ]

DISABLE_COLLECTSTATIC = 0

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CRON_CLASSES = [
        "accounts.cron.CronTestView"
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES":[
            "rest_framework.authentication.TokenAuthentication",
            ],

    # "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    # "PAGE_SIZE":5,
}

CORS_ALLOW_ALL_ORIGINS = True

#cloudinary set up
if not DEBUG: #use cloudinary only in production
		CLOUDINARY_STORAGE = {
		    'CLOUD_NAME': os.environ["CLOUD_NAME"],
		    'API_KEY': os.environ["API_KEY"],
		    'API_SECRET': os.environ["API_SECRET"],
		}
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

#email setup
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL') 
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PW')
DEFAULT_FROM_EMAIL = 'Prawko <rprogrammer97@gmail.com>'