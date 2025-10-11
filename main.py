from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import engine, SessionLocal

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="PySQL Gym 🧠")

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🏠 Home route
@app.get("/")
def read_root():
    return {"message": "Welcome to PySQL Gym! 🏋️‍♀️"}


# 🧱 TOPIC ENDPOINTS
@app.post("/topics/", response_model=schemas.Topic)
def create_topic(topic: schemas.TopicCreate, db: Session = Depends(get_db)):
    db_topic = models.Topic(title=topic.title, description=topic.description)
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic


@app.get("/topics/", response_model=list[schemas.Topic])
def read_topics(db: Session = Depends(get_db)):
    return db.query(models.Topic).all()


# ❓ QUIZ ENDPOINTS
@app.post("/quizzes/", response_model=schemas.Quiz)
def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
    # Check if topic exists
    topic = db.query(models.Topic).filter(models.Topic.id == quiz.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    db_quiz = models.Quiz(question=quiz.question, answer=quiz.answer, topic_id=quiz.topic_id)
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    return db_quiz


@app.get("/quizzes/", response_model=list[schemas.Quiz])
def read_quizzes(db: Session = Depends(get_db)):
    return db.query(models.Quiz).all()


# 🧾 SUBMISSION ENDPOINTS
@app.post("/submissions/", response_model=schemas.Submission)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    # Check if quiz exists
    quiz = db.query(models.Quiz).filter(models.Quiz.id == submission.quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    db_submission = models.Submission(
        user_name=submission.user_name,
        user_answer=submission.user_answer,
        quiz_id=submission.quiz_id,
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission


@app.get("/submissions/", response_model=list[schemas.Submission])
def read_submissions(db: Session = Depends(get_db)):
    return db.query(models.Submission).all()
