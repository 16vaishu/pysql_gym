# Base Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies (for building frontend)
RUN apt-get update && apt-get install -y curl nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend Python files
COPY *.py ./

# Copy frontend source
COPY frontend/build ./frontend/build

# Build frontend (React/Vue SPA)
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Switch back to app directory
WORKDIR /app

# Expose port for Cloud Run
EXPOSE 8080

# Start FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
