from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Quiz

db: Session = SessionLocal()

quizzes = db.query(Quiz).all()

for quiz in quizzes:
    # agar string ke andar extra ["[ ... "]"] ho
    if quiz.choices.startswith('["[') and quiz.choices.endswith('"]"]'):
        fixed = quiz.choices.replace('["[', '[').replace('"]"]', ']')
        # agar abhi bhi backslashes hai
        fixed = fixed.replace('\\"', '"')
        quiz.choices = fixed

db.commit()
db.close()
print("✅ All quiz options fixed successfully!")
