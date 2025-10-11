from pydantic import BaseModel
from typing import List, Optional

class QuizBase(BaseModel):
    question: str
    answer: str

class QuizCreate(QuizBase):
    pass

class Quiz(QuizBase):
    id: int
    topic_id: int

    class Config:
        orm_mode = True


class TopicBase(BaseModel):
    title: str
    description: Optional[str] = None

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: int
    quizzes: List[Quiz] = []

    class Config:
        orm_mode = True


class SubmissionBase(BaseModel):
    user_name: str
    user_answer: str

class SubmissionCreate(SubmissionBase):
    quiz_id: int

class Submission(SubmissionBase):
    id: int
    quiz_id: int

    class Config:
        orm_mode = True
