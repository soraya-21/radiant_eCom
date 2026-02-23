FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Installation des dépendances système (nécessaires pour psycopg2 ou d'autres packages)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Installation des dépendances Python
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copie du projet
COPY . /app/

# On expose le port 8000
EXPOSE 8000