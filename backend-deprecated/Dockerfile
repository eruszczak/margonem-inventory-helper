FROM python:3.6-slim
ENV PYTHONUNBUFFERED 1

RUN useradd --uid 1000 --create-home runner

USER 1000:1000

ENV PATH="/home/runner/.local/bin:${PATH}"

WORKDIR /code/

COPY --chown=1000:1000 requirements.txt /code/

RUN pip install -r requirements.txt

COPY --chown=1000:1000 . /code

EXPOSE 8000