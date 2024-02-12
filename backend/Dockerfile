# Use an official Python runtime as a parent image
FROM python:3.9-slim as development

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt .
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    pkg-config \
    && apt-get clean
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the current directory contents into the container
COPY . .