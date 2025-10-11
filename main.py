from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import models, schemas, crud
from database import engine, SessionLocal

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PySQL Gym 🧠", description="Learn Python and SQL through interactive quizzes!")

# Mount static files
# app.mount("/static", StaticFiles(directory="static"), name="static")

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🏠 Home route - serve the frontend
@app.get("")
def read_root():
    return FileResponse("static/index.html")


# 🧱 TOPIC ENDPOINTS
@app.post("/api/topics/", response_model=schemas.Topic)
def create_topic(topic: schemas.TopicCreate, db: Session = Depends(get_db)):
    return crud.create_topic(db=db, topic=topic)


@app.get("/api/topics/", response_model=list[schemas.Topic])
def read_topics(db: Session = Depends(get_db)):
    return crud.get_topics(db)


@app.get("/api/topics/{topic_id}", response_model=schemas.Topic)
def read_topic(topic_id: int, db: Session = Depends(get_db)):
    topic = crud.get_topic(db, topic_id=topic_id)
    if topic is None:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic


# ❓ QUIZ ENDPOINTS
@app.post("/api/quizzes/", response_model=schemas.Quiz)
def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
    # Check if topic exists
    topic = crud.get_topic(db, topic_id=quiz.topic_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return crud.create_quiz(db=db, quiz=quiz)


@app.get("/api/quizzes/topic/{topic_id}", response_model=list[schemas.Quiz])
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


@app.get("/api/submissions/", response_model=list[schemas.Submission])
def read_submissions(db: Session = Depends(get_db)):
    return crud.get_submissions(db)


# 🎯 Initialize with sample data
@app.post("/api/init-data/")
def initialize_sample_data(db: Session = Depends(get_db)):
    """Initialize the database with sample topics and quizzes"""
    
    # Check if data already exists
    existing_topics = crud.get_topics(db)
    if existing_topics:
        return {"message": "Sample data already exists"}
    
    # Create sample topics
    python_topic = crud.create_topic(db, schemas.TopicCreate(
        title="Python Basics",
        description="Learn the fundamentals of Python programming"
    ))
    
    sql_topic = crud.create_topic(db, schemas.TopicCreate(
        title="SQL Fundamentals", 
        description="Master the basics of SQL database queries"
    ))
    
    # Create sample Python quizzes
    python_quizzes = [
        {
            "question": "What is the correct way to create a list in Python?",
            "choices": ["list = []", "list = ()", "list = {}", "list = <>"],
            "correct_answer": "list = []",
            "topic_id": python_topic.id
        },
        {
            "question": "Which keyword is used to define a function in Python?",
            "choices": ["function", "def", "func", "define"],
            "correct_answer": "def",
            "topic_id": python_topic.id
        },
        {
            "question": "What does 'len()' function do in Python?",
            "choices": ["Returns the length of an object", "Creates a new list", "Sorts a list", "Removes duplicates"],
            "correct_answer": "Returns the length of an object",
            "topic_id": python_topic.id
        }
    ]
    
    # Create sample SQL quizzes
    sql_quizzes = [
        {
            "question": "Which SQL statement is used to extract data from a database?",
            "choices": ["GET", "SELECT", "EXTRACT", "OPEN"],
            "correct_answer": "SELECT",
            "topic_id": sql_topic.id
        },
        {
            "question": "Which SQL clause is used to filter records?",
            "choices": ["FILTER", "WHERE", "HAVING", "CONDITION"],
            "correct_answer": "WHERE",
            "topic_id": sql_topic.id
        },
        {
            "question": "What does SQL stand for?",
            "choices": ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"],
            "correct_answer": "Structured Query Language",
            "topic_id": sql_topic.id
        }
    ]
    
    # Add all quizzes
    for quiz_data in python_quizzes + sql_quizzes:
        crud.create_quiz(db, schemas.QuizCreate(**quiz_data))
    
    return {"message": "Sample data initialized successfully!"}