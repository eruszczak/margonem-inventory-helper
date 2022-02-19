FROM python:3.6-slim
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt /code
RUN pip install -r requirements.txt

COPY . /code

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "margonem.wsgi"]