


import os
import json
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PySQL Gym 🧠",
    description="Learn Python and SQL through interactive quizzes!"
)
origins=[
    "http://127.0.0.1:3000",
    "http://localhost:3000"
    
]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Frontend static path
app = FastAPI()

# --- Serve frontend SPA ---
frontend_dist_path = os.path.join("frontend", "build")
app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist_path, "assets")), name="assets")

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Home route - serve the frontend
@app.get("/")
def read_root():
    return FileResponse(os.path.join(frontend_dist_path, "index.html"))

# 🧱 TOPIC ENDPOINTS
@app.post("/api/topics/", response_model=schemas.Topic)
def create_topic(topic: schemas.TopicCreate, db: Session = Depends(get_db)):
    return crud.create_topic(db=db, topic=topic)

@app.get("/api/topics/", response_model=List[schemas.Topic])
def read_topics(db: Session = Depends(get_db)):
    return crud.get_topics(db)

@app.get("/api/topics/{topic_id}", response_model=schemas.Topic)
def read_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = crud.get_topic(db, topic_id=topic_id)
    if topic is None:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic

# ❓ QUIZ ENDPOINTS
@app.get("/api/quizzes/")
def get_quizzes_for_frontend(db: Session = Depends(get_db)):
    topics = crud.get_topics(db)
    quizzes = crud.get_quizzes(db)
    response = []

    for topic in topics:
        if topic.title.strip() == "Python Basics":
            subject_name = "Python"
            icon = "🐍"
        elif topic.title.strip() == "SQL Fundamentals":
            subject_name = "SQL"
            icon = "💾"
        # else:
        #     subject_name = "API"
        #     icon = "⚙️"

        for level in ["Beginner", "Intermediate", "Advanced"]:
            topic_quizzes = [
                q for q in quizzes if q.topic_id == topic.id and (q.level or "Beginner").capitalize() == level
            ]
            if not topic_quizzes:
                continue

            response.append({
                "id": f"{topic.id}-{level}",
                "title": topic.title,
                "subject": subject_name,
                "difficulty": level,
                "questions": len(topic_quizzes),
                "description": topic.description,
                "icon": icon,
                "sampleQuestions": [
                   {
                        "question": q.question,
                        "options": q.choices if isinstance(q.choices, list) else json.loads(q.choices),
                        "correct_answer": q.correct_answer
                    }
                    for q in topic_quizzes
                ]
            })

    return response

@app.post("/api/quizzes/", response_model=schemas.Quiz)
def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
    topic = crud.get_topic(db, topic_id=quiz.topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return crud.create_quiz(db=db, quiz=quiz)

@app.get("/api/quizzes/topic/{topic_id}", response_model=List[schemas.Quiz])
def read_quizzes_by_topic(topic_id: int, db: Session = Depends(get_db)):
    return crud.get_quizzes_by_topic(db, topic_id=topic_id)

@app.get("/api/quizzes/{quiz_id}", response_model=schemas.Quiz)
def read_quiz(quiz_id: int, db: Session = Depends(get_db)):
    quiz = crud.get_quiz(db, quiz_id=quiz_id)
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

# 🧾 SUBMISSION ENDPOINTS
@app.post("/api/submissions/", response_model=schemas.Submission)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    db_submission = crud.create_submission(db=db, submission=submission)
    if db_submission is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return db_submission

@app.get("/api/submissions/", response_model=List[schemas.Submission])
def read_submissions(db: Session = Depends(get_db)):
    return crud.get_submissions(db)

# 🎯 Initialize sample data
@app.post("/api/init-data/")
def initialize_sample_data(db: Session = Depends(get_db)):
    existing_topics = crud.get_topics(db)
    if existing_topics:
        return {"message": "Sample data already exists"}

    python_topic = crud.create_topic(db, schemas.TopicCreate(
        title="Python Basics",
        description="Learn the fundamentals of Python programming"
    ))

    sql_topic = crud.create_topic(db, schemas.TopicCreate(
        title="SQL Fundamentals",
        description="Master the basics of SQL database queries"
    ))

    api_topic = crud.create_topic(db, schemas.TopicCreate(
        title="API Fundamentals",
        description="Master the Fundamentals of API"
    ))

   # all_quizzes = crud.sample_quizzes(python_topic.id, sql_topic.id, api_topic.id)
    all_quizzes = python_topic.id + sql_topic.id + api_topic.id

    for quiz_data in all_quizzes:
        existing_quiz = db.query(models.Quiz).filter(
            models.Quiz.question == quiz_data["question"],
            models.Quiz.topic_id == quiz_data["topic_id"]
        ).first()
        if not existing_quiz:
            crud.create_quiz(db, schemas.QuizCreate(**quiz_data))

    return {"message": "Sample data initialized successfully!"}
