FROM python:3.12

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir /app
WORKDIR /main

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 8010

CMD ["uvicorn", "app:main", "--host=0.0.0.0","--port=8010","--reload"]