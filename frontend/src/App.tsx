import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { DashboardPage } from "./components/DashboardPage";
import { TopicsPage } from "./components/TopicsPage";
import { QuizzesPage } from "./components/QuizzesPage";
import { ProfilePage } from "./components/ProfilePage";
import { ContactPage } from "./components/ContactPage";

type Page = "home" | "dashboard" | "topics" | "quizzes" | "profile" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      {currentPage === "home" && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === "dashboard" && (
        <DashboardPage onNavigate={handleNavigate} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {currentPage === "topics" && <TopicsPage onNavigate={handleNavigate} />}
      {currentPage === "quizzes" && <QuizzesPage onNavigate={handleNavigate} />}
      {currentPage === "contact" && <ContactPage onNavigate={handleNavigate} />}
      {currentPage === "profile" && (
        <ProfilePage onNavigate={handleNavigate} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
    </div>
  );
}
