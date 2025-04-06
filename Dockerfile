FROM python:3.12-alpine
WORKDIR /app
COPY api/ ./api
COPY compiler/ ./compiler
COPY templates/ ./api/templates

RUN pip install -r api/requirements.txt

WORKDIR /app/api
EXPOSE 5000
CMD ["python", "app.py"]
