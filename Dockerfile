# ================================
# Stage 1: Build the frontend
# ================================
FROM node:18 AS frontend-builder

WORKDIR /app/frontend
COPY frontend ./                 # 👈 copy your frontend source code
RUN npm install
RUN npm run build


# ================================
# Stage 2: Build the FastAPI backend
# ================================
FROM python:3.11-slim AS backend

# Set working directory
WORKDIR /app

# Copy dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY . .

# Copy built frontend files from previous stage
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Expose port for Cloud Run
EXPOSE 8080

# Environment variables
ENV PYTHONUNBUFFERED=1

# Start FastAPI app on port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
