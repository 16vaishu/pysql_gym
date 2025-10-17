import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface PreQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  quizTitle?: string;
}

export function PreQuizModal({ isOpen, onClose, onStart, quizTitle }: PreQuizModalProps) {
  if (!isOpen) return null;

  const handleStart = () => {
    // Smooth fade-out before starting quiz
    const modal = document.querySelector('.pre-quiz-content');
    if (modal) {
      modal.classList.add('pre-quiz-fade-out');
      setTimeout(() => {
        onStart();
      }, 300);
    } else {
      onStart();
    }
  };

  return (
    <AnimatePresence>
      <div className="pre-quiz-modal" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pre-quiz-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="pre-quiz-heading">
            🧠 Ready to Begin Your Challenge?
          </h2>
          
          {quizTitle && (
            <p className="text-center text-lg mb-6" style={{ color: 'var(--card-body)' }}>
              {quizTitle}
            </p>
          )}
          
          <div className="text-center mb-6" style={{ color: 'var(--card-body)' }}>
            <strong>Here's how it works:</strong>
          </div>
          
          <ul className="pre-quiz-list">
            <li>You'll face 10 timed questions.</li>
            <li>Scroll or swipe to move between them.</li>
            <li>You can skip and come back anytime.</li>
            <li>Press Submit when you're done.</li>
            <li>Get instant feedback with your score & hints.</li>
          </ul>
          
          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 glass-card"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gradient-bg glow-effect quiz-button-glow"
              onClick={handleStart}
            >
              Start Quiz 🚀
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
