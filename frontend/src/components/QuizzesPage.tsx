import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Code2, ArrowLeft, Play, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";
import { QuizModal } from "./QuizModal";
import { PreQuizModal } from "./PreQuizModal";

interface Quiz {
  id: string;
  title: string;
  subject: "Python" | "SQL" | "API";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: number;
  description: string;
  icon: string;
  sampleQuestions: {
    question: string;
    options?: string[];
  }[];
}

interface QuizzesPageProps {
  onNavigate: (page: string) => void;
}

export function QuizzesPage({ onNavigate }: QuizzesPageProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [showPreQuizModal, setShowPreQuizModal] = useState(false);
  const [pendingQuiz, setPendingQuiz] = useState<Quiz | null>(null);

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/quizzes/");
        if (!res.ok) throw new Error("Failed to fetch quizzes");
        const data = await res.json();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizzes();
  }, []);

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

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSubject = selectedSubject === "" || quiz.subject === selectedSubject;
    const matchesLevel = selectedLevel === "" || quiz.difficulty === selectedLevel;
    return matchesSubject && matchesLevel;
  });

  const showQuizzes = selectedSubject !== "" || selectedLevel !== "";

  // Results View
  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="nav-glass sticky top-0 z-50">
          <div className="container mx-auto px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setShowResults(false)} className="glass-card">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center glow-effect">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl gradient-text">PySQL Gym</span>
            </div>
          </div>
        </nav>

        <div className="flex-1 p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full"
          >
            <Card className="glass-card text-center glow-border-hover">
              <CardContent className="p-16">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8 glow-effect">
                  <CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl mb-4">Quiz Completed!</h1>
                <p className="text-xl text-muted-foreground mb-12">Excellent work finishing the quiz</p>
                <div className="glass-card rounded-2xl p-8 mb-8">
                  <div className="text-6xl gradient-text mb-4">8 / 10</div>
                  <p className="text-lg text-muted-foreground">Your Score</p>
                </div>
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setActiveQuiz(null);
                  }}
                  className="gradient-bg glow-effect px-10 py-6 text-lg"
                >
                  Back to Quizzes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Quiz Grid View
  return (
    <div className="min-h-screen flex flex-col">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-12 text-center">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl mb-4">
                🎯 Ready to Test Your Skills?
              </motion.h1>
              <p className="text-xl text-muted-foreground">Choose your path, pick your level, and challenge yourself.</p>
            </div>

            {/* Dropdown Filters */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mb-16">
              <div className="glass-card rounded-3xl p-10 glow-border-hover" style={{
                background: 'linear-gradient(135deg, rgba(10, 132, 255, 0.05), rgba(123, 97, 255, 0.05))',
                backdropFilter: 'blur(15px)'
              }}>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm mb-3 opacity-80">Select Subject</label>
                    <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className="quiz-dropdown w-full">
                      <option value="">All Subjects</option>
                      <option value="Python">🐍 Python</option>
                      <option value="SQL">💾 SQL</option>
                      <option value="API">⚙️ API Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-3 opacity-80">Select Level</label>
                    <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)} className="quiz-dropdown w-full">
                      <option value="">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                {!showQuizzes && (
                  <div className="text-center py-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                    <p className="text-muted-foreground text-lg">Select a subject and level to begin your coding challenge!</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quiz Grid */}
            {showQuizzes && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 slide-down">
                {filteredQuizzes.map((quiz, index) => (
                  <motion.div key={quiz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="quiz-card-enhanced h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="icon-3d">
                            <span className="icon-3d-text">{quiz.icon}</span>
                          </div>
                          <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-3">{quiz.title}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed">{quiz.description}</CardDescription>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                          <span>{quiz.questions} Questions</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-end">
                        <Button
                          onClick={() => {
                            setPendingQuiz(quiz);
                            setShowPreQuizModal(true);
                          }}
                          className="w-full gradient-bg glow-effect quiz-button-glow h-12 relative overflow-hidden"
                        >
                          <Play className="w-5 h-5 mr-2" /> Start Quiz <Sparkles className="w-4 h-4 ml-2 sparkle-icon" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {showQuizzes && filteredQuizzes.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl mb-2">No Quizzes Found</h3>
                  <p className="text-muted-foreground">Try selecting a different subject or level combination.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <PreQuizModal
        isOpen={showPreQuizModal}
        quizTitle={pendingQuiz?.title}
        onClose={() => { setShowPreQuizModal(false); setPendingQuiz(null); }}
        onStart={() => { setShowPreQuizModal(false); setActiveQuiz(pendingQuiz); setPendingQuiz(null); }}
      />
      <QuizModal
        quiz={activeQuiz}
        onClose={() => { setActiveQuiz(null); setSelectedAnswer(null); }}
        onComplete={() => { setActiveQuiz(null); setShowResults(true); }}
      />
    </div>
  );
}
