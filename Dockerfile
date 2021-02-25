# set base image (host OS)
FROM python:3.7-alpine

# set the working directory in the container
WORKDIR /code

# sets the location of the virtual env environment variable
ENV VIRTUAL_ENV=/opt/VIRTUAL_ENV

# creates virtual environment at location defined by VIRTUAL_ENV environment variable
RUN python3 -m venv $VIRTUAL_ENV

# adds the virtualenv's bin directory to the start of PATH
# functionally equivalent to "activating" virtualenv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# copy the dependencies file to the working directory
COPY requirements.txt requirements.txt

# install dependencies
RUN pip install -r requirements.txt

EXPOSE 5000

# copy the flask server file of the local src directory to the working directory
COPY app.py .

CMD ["flask", "run"]