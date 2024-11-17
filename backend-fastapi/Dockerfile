FROM python:3.12

RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    mkdir /app && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/cache/apt/*

WORKDIR /main

COPY requirements.txt ./
RUN pip3 install -r requirements.txt && \
    pip cache purge && \
    rm -rf /root/.cache/pip/*

EXPOSE 8000

CMD ["uvicorn", "app:main", "--host=0.0.0.0","--port=8000","--reload"]

