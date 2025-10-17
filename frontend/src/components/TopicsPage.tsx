import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Code2, ArrowLeft, Clock, Tag, BookOpen, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Footer } from "./Footer";

interface Topic {
  id: string;
  title: string;
  emoji: string;
  summary: string;
  overview: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  tags: string[];
  objectives: string[];
  questions: string[];
}

interface TopicsPageProps {
  onNavigate: (page: string) => void;
}

const topics: Topic[] = [
  {
    id: "1",
    title: "Python Basics",
    emoji: "🐍",
    summary: "Learn the rhythm of Python — where variables dance and logic flows.",
    overview: "Discover the magic behind print(), loops, and everything simple yet powerful. This course introduces you to the fundamentals of Python programming in a fun, engaging way.",
    difficulty: "Beginner",
    estimatedTime: "40 min",
    tags: ["Python", "Syntax"],
    objectives: [
      "Understand variables and data types",
      "Master print statements and string formatting",
      "Work with lists, tuples, and dictionaries",
      "Implement basic control flow"
    ],
    questions: [
      "What are data types?",
      "How to declare variables?",
      "What is the difference between lists and tuples?"
    ]
  },
  {
    id: "2",
    title: "Control Flow in Python",
    emoji: "⚙️",
    summary: "If you know 'if', you'll unlock all the doors. Learn loops and logic.",
    overview: "Master the art of decision-making in code with if-elif-else, while loops, and for loops. Control the flow of your programs like a pro.",
    difficulty: "Beginner",
    estimatedTime: "45 min",
    tags: ["Python", "Logic"],
    objectives: [
      "Write conditional statements (if/elif/else)",
      "Use while and for loops effectively",
      "Understand break and continue statements",
      "Apply nested loops and conditions"
    ],
    questions: [
      "How does if-else work?",
      "When to use while vs for?",
      "What does break do?"
    ]
  },
  {
    id: "3",
    title: "SQL Fundamentals",
    emoji: "💾",
    summary: "Query databases like a wizard. SELECT your future with SQL.",
    overview: "Learn how to retrieve, filter, and manipulate data from databases using SQL. Perfect for anyone working with structured data.",
    difficulty: "Beginner",
    estimatedTime: "50 min",
    tags: ["SQL", "Databases"],
    objectives: [
      "Write SELECT queries to retrieve data",
      "Filter results using WHERE clauses",
      "Sort and limit query results",
      "Understand basic SQL syntax"
    ],
    questions: [
      "What is SELECT?",
      "How to filter records?",
      "What does WHERE clause do?"
    ]
  },
  {
    id: "4",
    title: "Joins & Aggregations",
    emoji: "🔗",
    summary: "When one table isn't enough, JOIN forces!",
    overview: "Advanced SQL techniques for combining data from multiple tables and performing aggregate calculations. Essential for complex database queries.",
    difficulty: "Intermediate",
    estimatedTime: "50 min",
    tags: ["SQL", "Relational Data"],
    objectives: [
      "Understand different types of SQL joins",
      "Combine data from multiple tables",
      "Use GROUP BY and aggregate functions",
      "Apply HAVING clause for filtered aggregations"
    ],
    questions: [
      "What's a join?",
      "How to use GROUP BY?",
      "What is an INNER JOIN?"
    ]
  },
  {
    id: "5",
    title: "API Development with FastAPI",
    emoji: "🚀",
    summary: "Turn your logic into living APIs that speak fluently in JSON.",
    overview: "Build production-ready REST APIs using FastAPI. Learn about routing, request validation, response models, and automatic API documentation.",
    difficulty: "Advanced",
    estimatedTime: "70 min",
    tags: ["FastAPI", "Web"],
    objectives: [
      "Create GET, POST, PUT, DELETE endpoints",
      "Validate request data with Pydantic",
      "Implement path and query parameters",
      "Generate automatic API documentation"
    ],
    questions: [
      "What is FastAPI?",
      "What is Pydantic?",
      "How to define API routes?"
    ]
  },
  {
    id: "6",
    title: "Database ORM & Migrations",
    emoji: "🧩",
    summary: "Keep your data classy with ORM and make migrations painless.",
    overview: "Master Object-Relational Mapping with SQLAlchemy and manage database schema changes with Alembic migrations for scalable application development.",
    difficulty: "Advanced",
    estimatedTime: "80 min",
    tags: ["SQLAlchemy", "Alembic"],
    objectives: [
      "Define database models with SQLAlchemy",
      "Perform database operations using ORM",
      "Create and apply database migrations",
      "Manage schema versioning with Alembic"
    ],
    questions: [
      "What is ORM?",
      "Why use migrations?",
      "What does Alembic manage?"
    ]
  }
];

export function TopicsPage({ onNavigate }: TopicsPageProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedTopic(null);
    };

    if (selectedTopic) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [selectedTopic]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(180deg, #F8FBFF 0%, #FFFFFF 50%, #F3F0FF 100%)'
    }}>
      {/* Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")} className="glass-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center glow-effect">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl gradient-text">PySQL Gym</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 p-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header Section */}
            <div className="mb-16 text-center">
              <h1 className="text-5xl mb-4" style={{ color: '#102030' }}>
                📘 Topics
              </h1>
              <p className="text-xl" style={{ color: '#405674' }}>
                Choose your adventure and start learning at your own pace.
              </p>
            </div>

            {/* Topic Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="topic-card-simple h-full flex flex-col cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="topic-icon-simple group-hover:topic-icon-tilt">
                          {topic.emoji}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="difficulty-badge">
                            {topic.difficulty}
                          </span>
                          <span className="time-badge-simple">
                            <Clock className="w-3 h-3 mr-1 inline" />
                            {topic.estimatedTime}
                          </span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-2xl mb-3 topic-title-simple">
                        {topic.title}
                      </CardTitle>
                      
                      <CardDescription className="text-base leading-relaxed topic-subtitle-simple mb-4">
                        {topic.summary}
                      </CardDescription>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {topic.tags.map((tag, i) => (
                          <span key={i} className="topic-tag-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <button
                        onClick={() => setSelectedTopic(topic)}
                        className="view-details-button group/btn"
                      >
                        <span>View Details</span>
                        <span className="view-details-arrow">→</span>
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* View Details Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedTopic(null)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="topic-modal pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="topic-icon-modal">
                      {selectedTopic.emoji}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl mb-2 gradient-text">
                        {selectedTopic.title}
                      </h2>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="difficulty-badge">
                          {selectedTopic.difficulty}
                        </span>
                        <span className="time-badge-simple">
                          <Clock className="w-4 h-4 mr-1 inline" />
                          {selectedTopic.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="modal-close-button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Overview */}
                <div className="mb-6">
                  <p className="text-base leading-relaxed topic-subtitle-simple">
                    {selectedTopic.overview}
                  </p>
                </div>

                {/* You'll Learn Section */}
                <div className="mb-6">
                  <h3 className="text-xl mb-4 topic-title-simple">
                    📚 You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    {selectedTopic.objectives.map((objective, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="modal-checkmark">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <span className="topic-subtitle-simple flex-1">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {selectedTopic.tags.map((tag, i) => (
                      <span key={i} className="topic-tag-chip">
                        <Tag className="w-3 h-3 mr-1 inline" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="modal-close-btn"
                    onClick={() => setSelectedTopic(null)}
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
