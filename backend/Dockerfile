# Use an official Python runtime as a parent image
FROM python:3.12 AS python-build
RUN pip install mysqlclient

FROM python:3.12-slim
COPY --from=python-build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
RUN apt-get update && apt-get install -y libmariadb3

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 58888 available to the world outside this container
EXPOSE 58888

# Define environment variable

# Run main.py when the container launches
CMD ["gunicorn", "-b", "0.0.0.0:58888", "main:app"]
