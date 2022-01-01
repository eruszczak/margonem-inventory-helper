FROM python:3.6-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /code
RUN pip install setuptools==45 gunicorn

COPY requirements.txt /code
RUN pip install -r requirements.txt

COPY . /code





# alpine - 722 MB!
# FROM python:3.6-alpine
# ENV PYTHONUNBUFFERED 1

# WORKDIR /code
# RUN apk add --no-cache gcc make musl-dev postgresql-dev libffi-dev

# # For Pillow (https://stackoverflow.com/questions/57787424/django-docker-python-unable-to-install-pillow-on-python-alpine)
# RUN apk add --no-cache jpeg-dev zlib-dev
# RUN apk add --no-cache --virtual .build-deps build-base linux-headers \
#     && pip install Pillow

# RUN pip install setuptools==45 gunicorn

# COPY requirements.txt /code
# RUN pip install -r requirements.txt

# COPY . /code







# alpine - 687 MB!
# FROM python:3.6-alpine
# ENV PYTHONUNBUFFERED 1

# WORKDIR /code
# RUN apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev libffi-dev make
# RUN pip install setuptools==45 gunicorn

# COPY requirements.txt /code
# RUN pip install -r requirements.txt

# COPY . /code