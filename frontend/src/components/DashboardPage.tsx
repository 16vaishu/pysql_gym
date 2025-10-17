import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BookOpen, FileCheck, TrendingUp, Code2, User, Moon, Sun, LayoutDashboard } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";

interface DashboardPageProps {
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function DashboardPage({ onNavigate, darkMode, toggleDarkMode }: DashboardPageProps) {
  const topicsCompleted = 4;
  const totalTopics = 6;
  const quizzesAttempted = 3;
  const totalQuizzes = 9;
  const overallProgress = 65;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center glow-effect">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl gradient-text">PySQL Gym</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="glass-card">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-xl cursor-pointer hover-lift">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center glow-effect">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 glass-card border-r hidden lg:block m-6 rounded-2xl p-6">
          <nav className="space-y-2">
            {[
              { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", page: "dashboard" },
              { icon: <BookOpen className="w-5 h-5" />, label: "Topics", page: "topics" },
              { icon: <FileCheck className="w-5 h-5" />, label: "Quizzes", page: "quizzes" },
              { icon: <User className="w-5 h-5" />, label: "Profile", page: "profile" },
            ].map((item, index) => (
              <motion.button
                key={item.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate(item.page)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-base ${
                  item.page === "dashboard"
                    ? "gradient-bg text-white glow-effect"
                    : "glass-card hover-lift"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Welcome Banner */}
              <div className="mb-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-2xl p-8 mb-8 glow-border-hover"
                >
                  <h1 className="text-4xl mb-3">
                    Welcome Back, Coder <span className="wave-hand">👋</span>
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    You're doing awesome! Keep the momentum going.
                  </p>
                </motion.div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Topics Conquered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="dashboard-metric-1 hover-lift transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl dashboard-metric-icon-1 flex items-center justify-center">
                          <BookOpen className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl dashboard-metric-value mb-1">{topicsCompleted}</div>
                          <div className="text-sm dashboard-metric-subtitle">of {totalTopics}</div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg mb-4 dashboard-metric-title">🏁 Topics Conquered</CardTitle>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm dashboard-metric-subtitle">
                          <span>Progress</span>
                          <span>{Math.round((topicsCompleted / totalTopics) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-white/40 dark:bg-gray-700/40 rounded-full overflow-hidden">
                          <div className="progress-gradient h-full" style={{ width: `${(topicsCompleted / totalTopics) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="mt-4 bg-white/30 dark:bg-black/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-xs dashboard-metric-subtitle">
                          💡 Double tap on a Topic to jump right back in!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quizzes Completed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="dashboard-metric-2 hover-lift transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl dashboard-metric-icon-2 flex items-center justify-center">
                          <FileCheck className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl dashboard-metric-value mb-1">{quizzesAttempted}</div>
                          <div className="text-sm dashboard-metric-subtitle">of {totalQuizzes}</div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg mb-4 dashboard-metric-title">🧩 Quizzes Completed</CardTitle>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm dashboard-metric-subtitle">
                          <span>Progress</span>
                          <span>{Math.round((quizzesAttempted / totalQuizzes) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-white/40 dark:bg-gray-700/40 rounded-full overflow-hidden">
                          <div className="progress-gradient h-full" style={{ width: `${(quizzesAttempted / totalQuizzes) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="mt-4 bg-white/30 dark:bg-black/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-xs dashboard-metric-subtitle">
                          🏅 Each quiz you complete earns you skill points!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Learning Progress */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="dashboard-metric-3 hover-lift transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl dashboard-metric-icon-3 flex items-center justify-center">
                          <TrendingUp className="w-7 h-7" />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl dashboard-metric-value mb-1">{overallProgress}%</div>
                          <div className="text-sm dashboard-metric-subtitle">Complete</div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg mb-4 dashboard-metric-title">📈 Learning Progress</CardTitle>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm dashboard-metric-subtitle">
                          <span>Overall</span>
                          <span>{overallProgress}%</span>
                        </div>
                        <div className="h-2 bg-white/40 dark:bg-gray-700/40 rounded-full overflow-hidden">
                          <div className="progress-gradient h-full" style={{ width: `${overallProgress}%` }}></div>
                        </div>
                      </div>

                      <div className="mt-4 bg-white/30 dark:bg-black/20 rounded-lg p-3 backdrop-blur-sm">
                        <p className="text-xs dashboard-metric-subtitle">
                          🚀 You're crushing it! Keep going!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="gradient-bg glow-effect px-8 py-6 text-base"
                    onClick={() => onNavigate("topics")}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="glass-card glow-border-hover px-8 py-6 text-base"
                    onClick={() => onNavigate("quizzes")}
                  >
                    <FileCheck className="w-5 h-5 mr-2" />
                    Take a Quiz
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
