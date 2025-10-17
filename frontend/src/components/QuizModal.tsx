// import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { X, ChevronLeft, ChevronRight, Clock } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";

// interface Quiz {
//   id: string;
//   title: string;
//   subject: string;
//   difficulty: string;
//   questions: number;
//   sampleQuestions: {
//     question: string;
//     options?: string[];
//   }[];
// }

// interface QuizModalProps {
//   quiz: Quiz | null;
//   onClose: () => void;
//   onComplete: () => void;
// }

// export function QuizModal({ quiz, onClose, onComplete }: QuizModalProps) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
//   const [showResults, setShowResults] = useState(false);
//   const [timeElapsed, setTimeElapsed] = useState(0);

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft" && currentQuestion > 0) handlePrevious();
//       if (e.key === "ArrowRight" && currentQuestion < quiz!.sampleQuestions.length - 1) handleNext();
//       if (e.key === "Enter" && selectedAnswer !== null) handleNext();
//     };

//     if (quiz && !showResults) {
//       document.addEventListener("keydown", handleEscape);
//       return () => document.removeEventListener("keydown", handleEscape);
//     }
//   }, [quiz, currentQuestion, selectedAnswer, showResults]);

//   useEffect(() => {
//     if (!quiz || showResults) return;
    
//     const timer = setInterval(() => {
//       setTimeElapsed(prev => prev + 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quiz, showResults]);

//   if (!quiz) return null;

//   const getDifficultyColor = (difficulty: string) => {
//     switch (difficulty) {
//       case "Beginner":
//         return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
//       case "Intermediate":
//         return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
//       case "Advanced":
//         return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
//       default:
//         return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
//     }
//   };

//   const formatTime = (seconds: number) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleNext = () => {
//     if (selectedAnswer !== null) {
//       setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion]));
//     }
//     if (currentQuestion < quiz.sampleQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setSelectedAnswer(null);
//     }
//   };

//   const handleSubmit = () => {
//     setShowResults(true);
//   };

//   const handleTryAgain = () => {
//     setCurrentQuestion(0);
//     setSelectedAnswer(null);
//     setAnsweredQuestions(new Set());
//     setShowResults(false);
//     setTimeElapsed(0);
//   };

//   const currentQ = quiz.sampleQuestions[currentQuestion];
//   const progress = ((currentQuestion + 1) / quiz.sampleQuestions.length) * 100;
//   const score = Math.floor(Math.random() * 30 + 70); // Mock score

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="quiz-screen-fitted"
//       >
//         {/* Floating Background Lights */}
//         <div className="quiz-bg-light quiz-bg-light-1" />
//         <div className="quiz-bg-light quiz-bg-light-2" />

//         {!showResults ? (
//           <>
//             {/* Header */}
//             <div className="quiz-header-clean">
//               <div className="container mx-auto px-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <h2 className="quiz-title-gradient text-2xl">
//                     {quiz.title}
//                   </h2>
//                   <Badge className={getDifficultyColor(quiz.difficulty)}>
//                     {quiz.difficulty}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <div className="quiz-timer">
//                     <Clock className="w-4 h-4" />
//                     <span>{formatTime(timeElapsed)}</span>
//                   </div>
//                   <button
//                     onClick={onClose}
//                     className="quiz-exit-button"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Main Question Area */}
//             <div className="quiz-main-area">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentQuestion}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.3 }}
//                   className="quiz-question-container"
//                 >
//                   <div className="quiz-question-header">
//                     <span className="quiz-question-number">Q{currentQuestion + 1}</span>
//                     <span className="quiz-question-icon">🧩</span>
//                   </div>

//                   <h3 className="quiz-question-text">
//                     {currentQ.question}
//                   </h3>

//                   <div className="quiz-options-grid">
//                     {currentQ.options?.map((option, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedAnswer(index)}
//                         className={`quiz-option-button ${
//                           selectedAnswer === index ? "quiz-option-selected" : ""
//                         }`}
//                       >
//                         <div className="quiz-option-radio">
//                           {selectedAnswer === index && (
//                             <div className="quiz-option-check" />
//                           )}
//                         </div>
//                         <span className="quiz-option-text">{option}</span>
//                         {selectedAnswer === index && (
//                           <span className="quiz-option-checkmark">✓</span>
//                         )}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Pagination Dots */}
//                   <div className="quiz-pagination-dots">
//                     {quiz.sampleQuestions.map((_, idx) => (
//                       <div
//                         key={idx}
//                         className={`quiz-dot ${
//                           idx === currentQuestion ? "quiz-dot-active" : ""
//                         } ${answeredQuestions.has(idx) ? "quiz-dot-answered" : ""}`}
//                       />
//                     ))}
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Footer */}
//             <div className="quiz-footer-clean">
//               <div className="container mx-auto px-6">
//                 {/* Progress Bar */}
//                 <div className="quiz-progress-container">
//                   <div
//                     className="quiz-progress-fill-animated"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="quiz-nav-buttons">
//                   <Button
//                     variant="outline"
//                     className="quiz-nav-btn quiz-nav-btn-secondary"
//                     onClick={handlePrevious}
//                     disabled={currentQuestion === 0}
//                   >
//                     <ChevronLeft className="w-5 h-5 mr-2" />
//                     Previous
//                   </Button>
                  
//                   {currentQuestion < quiz.sampleQuestions.length - 1 ? (
//                     <Button
//                       className="quiz-nav-btn quiz-nav-btn-primary"
//                       onClick={handleNext}
//                       disabled={selectedAnswer === null}
//                     >
//                       Next
//                       <ChevronRight className="w-5 h-5 ml-2" />
//                     </Button>
//                   ) : (
//                     <Button
//                       className="quiz-nav-btn quiz-nav-btn-primary"
//                       onClick={handleSubmit}
//                       disabled={selectedAnswer === null}
//                     >
//                       Submit Quiz
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : (
//           /* Results Modal */
//           <div className="quiz-results-overlay">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="quiz-results-modal"
//             >
//               {/* Confetti */}
//               <div className="quiz-confetti-container">
//                 {[...Array(30)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="quiz-confetti-piece"
//                     style={{
//                       left: `${Math.random() * 100}%`,
//                       animationDelay: `${Math.random() * 0.5}s`,
//                       background: i % 2 === 0 ? '#0A84FF' : '#7B61FF'
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="text-center mb-6">
//                 <div className="quiz-results-emoji">🎉</div>
//                 <h2 className="quiz-results-title">Quiz Complete!</h2>
//                 <div className="quiz-results-score">{score}%</div>
//                 <p className="quiz-results-message">
//                   {score >= 80 ? "Outstanding work!" : score >= 60 ? "Great effort!" : "Keep practicing!"}
//                 </p>
//               </div>

//               <div className="quiz-results-stats">
//                 <div className="quiz-results-stat">
//                   <span className="quiz-results-stat-label">Questions</span>
//                   <span className="quiz-results-stat-value">{quiz.sampleQuestions.length}</span>
//                 </div>
//                 <div className="quiz-results-stat">
//                   <span className="quiz-results-stat-label">Time</span>
//                   <span className="quiz-results-stat-value">{formatTime(timeElapsed)}</span>
//                 </div>
//                 <div className="quiz-results-stat">
//                   <span className="quiz-results-stat-label">Score</span>
//                   <span className="quiz-results-stat-value">{score}%</span>
//                 </div>
//               </div>

//               <div className="flex gap-4 mt-8">
//                 <Button
//                   variant="outline"
//                   className="flex-1 quiz-results-btn-secondary"
//                   onClick={onClose}
//                 >
//                   Exit
//                 </Button>
//                 <Button
//                   className="flex-1 quiz-results-btn-primary"
//                   onClick={handleTryAgain}
//                 >
//                   Try Again
//                 </Button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </motion.div>
//     </AnimatePresence>
//   );
// }



import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  questions: number;
  sampleQuestions: {
    question: string;
    options?: string[];
    correct_answer?: string; // ✅ added this to match backend
  }[];
}

interface QuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
  onComplete: () => void;
}

export function QuizModal({ quiz, onClose, onComplete }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // ✅ Initialize selectedAnswers when quiz loads
  useEffect(() => {
    if (quiz) {
      setSelectedAnswers(Array(quiz.sampleQuestions.length).fill(null));
    }
  }, [quiz]);

  // Timer logic
  useEffect(() => {
    if (!quiz || showResults) return;
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [quiz, showResults]);

  if (!quiz) return null;

  // Color for difficulty badge
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

  // Format timer (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ✅ Handle option select
  const handleSelect = (index: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = index;
    setSelectedAnswers(updated);
  };

  // ✅ Navigation buttons
  const handleNext = () => {
    if (currentQuestion < quiz.sampleQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // ✅ Score calculation logic
  const calculateScore = () => {
    let correctCount = 0;
    quiz.sampleQuestions.forEach((q, i) => {
      const selectedIndex = selectedAnswers[i];
      if (
        selectedIndex !== null &&
        q.options &&
        q.options[selectedIndex] === q.correct_answer
      ) {
        correctCount++;
      }
    });
    return Math.round((correctCount / quiz.sampleQuestions.length) * 100);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(quiz.sampleQuestions.length).fill(null));
    setShowResults(false);
    setTimeElapsed(0);
  };

  const currentQ = quiz.sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.sampleQuestions.length) * 100;

  // ✅ Now score is based on correct answers (not random)
  const score = showResults ? calculateScore() : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="quiz-screen-fitted"
      >
        {/* Background effects */}
        <div className="quiz-bg-light quiz-bg-light-1" />
        <div className="quiz-bg-light quiz-bg-light-2" />

        {!showResults ? (
          <>
            {/* Header */}
            <div className="quiz-header-clean">
              <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="quiz-title-gradient text-2xl">
                    {quiz.title}
                  </h2>
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="quiz-timer">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(timeElapsed)}</span>
                  </div>
                  <button onClick={onClose} className="quiz-exit-button">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Question Area */}
            <div className="quiz-main-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="quiz-question-container"
                >
                  <div className="quiz-question-header">
                    <span className="quiz-question-number">
                      Q{currentQuestion + 1}
                    </span>
                    <span className="quiz-question-icon">🧩</span>
                  </div>

                  <h3 className="quiz-question-text">{currentQ.question}</h3>

                  <div className="quiz-options-grid">
                    {currentQ.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`quiz-option-button ${
                          selectedAnswers[currentQuestion] === index
                            ? "quiz-option-selected"
                            : ""
                        }`}
                      >
                        <div className="quiz-option-radio">
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="quiz-option-check" />
                          )}
                        </div>
                        <span className="quiz-option-text">{option}</span>
                        {selectedAnswers[currentQuestion] === index && (
                          <span className="quiz-option-checkmark">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Pagination Dots */}
                  <div className="quiz-pagination-dots">
                    {quiz.sampleQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`quiz-dot ${
                          idx === currentQuestion ? "quiz-dot-active" : ""
                        } ${
                          selectedAnswers[idx] !== null
                            ? "quiz-dot-answered"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="quiz-footer-clean">
              <div className="container mx-auto px-6">
                {/* Progress Bar */}
                <div className="quiz-progress-container">
                  <div
                    className="quiz-progress-fill-animated"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="quiz-nav-buttons">
                  <Button
                    variant="outline"
                    className="quiz-nav-btn quiz-nav-btn-secondary"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </Button>

                  {currentQuestion < quiz.sampleQuestions.length - 1 ? (
                    <Button
                      className="quiz-nav-btn quiz-nav-btn-primary"
                      onClick={handleNext}
                      disabled={selectedAnswers[currentQuestion] === null}
                    >
                      Next
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      className="quiz-nav-btn quiz-nav-btn-primary"
                      onClick={handleSubmit}
                      disabled={selectedAnswers[currentQuestion] === null}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // ✅ RESULTS SCREEN
          <div className="quiz-results-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="quiz-results-modal"
            >
              {/* Confetti */}
              <div className="quiz-confetti-container">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="quiz-confetti-piece"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      background: i % 2 === 0 ? "#0A84FF" : "#7B61FF",
                    }}
                  />
                ))}
              </div>

              <div className="text-center mb-6">
                <div className="quiz-results-emoji">🎉</div>
                <h2 className="quiz-results-title">Quiz Complete!</h2>
                <div className="quiz-results-score">{score}%</div>
                <p className="quiz-results-message">
                  {score >= 80
                    ? "Outstanding work!"
                    : score >= 60
                    ? "Great effort!"
                    : "Keep practicing!"}
                </p>
              </div>

              <div className="quiz-results-stats">
                <div className="quiz-results-stat">
                  <span className="quiz-results-stat-label">Questions</span>
                  <span className="quiz-results-stat-value">
                    {quiz.sampleQuestions.length}
                  </span>
                </div>
                <div className="quiz-results-stat">
                  <span className="quiz-results-stat-label">Time</span>
                  <span className="quiz-results-stat-value">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
                <div className="quiz-results-stat">
                  <span className="quiz-results-stat-label">Score</span>
                  <span className="quiz-results-stat-value">{score}%</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  className="flex-1 quiz-results-btn-secondary"
                  onClick={onClose}
                >
                  Exit
                </Button>
                <Button
                  className="flex-1 quiz-results-btn-primary"
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
