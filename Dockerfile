# Start with the python:3.9 image
FROM python:3.9

ENV REACT_APP_BASE_URL=https://henmo.herokuapp.com/
ENV FLASK_APP=backend
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

WORKDIR /var/www

COPY . .

COPY /frontend/build/* backend/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2


CMD gunicorn backend:app
