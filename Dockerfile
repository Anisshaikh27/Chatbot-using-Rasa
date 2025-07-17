FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model (if you're using it)
RUN python -m spacy download en_core_web_md

# Copy project files
COPY . .

# Train the model
RUN rasa train

# Expose ports
EXPOSE 5005
EXPOSE 5055

# Create a startup script
RUN echo '#!/bin/bash\nrasa run actions --port 5055 --host 0.0.0.0 &\nrasa run --enable-api --port 5005 --host 0.0.0.0' > start.sh
RUN chmod +x start.sh

# Start both services
CMD ["./start.sh"]