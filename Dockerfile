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

# Download spaCy model
RUN python -m spacy download en_core_web_md

# Copy project files
COPY . .

# Train the model
RUN rasa train

# Fix SQLAlchemy compatibility issue
ENV SQLALCHEMY_WARN_20=1

# Expose port
EXPOSE 5005

# Create a startup script
RUN echo '#!/bin/bash\n\
rasa run actions --port 5055 &\n\
rasa run --enable-api --port 5005 -i 0.0.0.0 --cors "*"\n\
' > /app/start.sh

RUN chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"]