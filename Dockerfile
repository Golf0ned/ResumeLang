FROM python:3.12-alpine
WORKDIR /app
COPY api/ ./api
COPY compiler/ ./compiler
COPY templates/ ./api/templates

RUN pip install -r api/requirements.txt

RUN apk add --no-cache texlive-most

WORKDIR /app/api
ENV TMPDIR=/app/api/tmp
RUN mkdir -p $TMPDIR && chmod 777 $TMPDIR

EXPOSE 5000
CMD ["python", "app.py"]
