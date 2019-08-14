FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
RUN mkdir /code/static
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY . /code/
# CMD ["gunicorn", "--chdir", "margonem", "--bind", ":8000", "margonem.wsgi:application"]
