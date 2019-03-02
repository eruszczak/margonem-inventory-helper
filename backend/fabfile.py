from fabric.api import local
from fabric.state import env


# env.hosts =['127.0.0.1']
env.hosts = ['localhost']


def cs():
    # needs to be confirmed
    local('python manage.py collectstatic --noinput')


def pull():
    local('git pull')


def makemigrations():
    local('python manage.py makemigrations')


def migrate():
    local('python manage.py migrate')


def db():
    makemigrations()
    migrate()


def requirements():
    local('sudo pip install -r requirements.txt')


def shell():
    local('python manage.py shell')


def freeze():
    local('pip freeze')


def manage(command):
    local('python manage.py ' + command)


def runserver():
    local('python manage.py runserver')


# def cache():
#     local('python manage.py clear_cache')


def deploy():
    pull()
    cs()
    requirements()
    migrate()


# def backup():
#     with virtualenv():
#         pass
