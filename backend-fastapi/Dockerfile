FROM python:3.12

# Set timezone and install required dependencies
RUN apt-get update && \
    apt-get install -yq tzdata && \
    ln -fs /usr/share/zoneinfo/America/Bogota /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/cache/apt/*

# Create a non-root user
RUN groupadd -r appuser && \
    useradd -r -g appuser appuser

# Set up the working directory
WORKDIR /main

# Copy the requirements file and install dependencies
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt && \
    rm -rf /root/.cache/pip/*

# Copy application code
COPY . .

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appuser /main

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "app:main", "--host=0.0.0.0", "--port=8000", "--reload"]
