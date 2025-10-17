import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Code2, CheckCircle2, ChevronDown, Sparkles, Zap, MessageCircle, Cloud } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is FastAPI?",
      answer: "FastAPI is a modern, fast web framework for building APIs with Python. It's designed for high performance and easy development with automatic documentation."
    },
    {
      question: "Why learn SQL?",
      answer: "SQL is essential for working with databases. It allows you to store, retrieve, and manipulate data efficiently in almost any application."
    },
    {
      question: "How does Docker help?",
      answer: "Docker packages your application with all its dependencies, ensuring it runs consistently across different environments from development to production."
    },
    {
      question: "What will I build?",
      answer: "You'll build real REST APIs, design databases, write complex queries, and deploy production-ready applications to the cloud."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center glow-effect">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl gradient-text">PySQL Gym</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-10"
          >
            <button className="nav-item nav-item-active">Home</button>
            <button onClick={() => onNavigate("dashboard")} className="nav-item">Dashboard</button>
            <button onClick={() => onNavigate("topics")} className="nav-item">Topics</button>
            <button onClick={() => onNavigate("quizzes")} className="nav-item">Quizzes</button>
            <button onClick={() => onNavigate("contact")} className="nav-item">Contact</button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section with Floating Bubbles */}
      <section className="pt-32 pb-16 px-8 relative overflow-hidden">
        {/* Floating Glow Circles */}
        <div className="floating-bubble w-64 h-64 top-20 left-10" style={{ animationDelay: '0s' }}></div>
        <div className="floating-bubble w-48 h-48 top-40 right-20" style={{ animationDelay: '3s' }}></div>
        <div className="floating-bubble w-56 h-56 bottom-20 left-1/4" style={{ animationDelay: '6s' }}></div>
        <div className="floating-bubble w-72 h-72 top-60 right-1/3" style={{ animationDelay: '9s' }}></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">Your AI-Powered Tech Workout Zone</span>
              </div>

              <h1 className="text-6xl md:text-7xl mb-8 leading-tight">
                <Zap className="w-16 h-16 inline-block text-primary mb-2" />
                <br />
                <span className="gradient-text">Supercharge Your Coding Skills</span>
                <br />
                <span>— One Query at a Time!</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Build real apps, write smart queries, and deploy your brilliance with PySQL Gym — your intelligent learning companion.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center mb-20">
                <Button size="lg" className="gradient-bg glow-effect text-lg px-10 py-7" onClick={() => onNavigate("dashboard")}>
                  Let's Begin 🚀
                </Button>
                <Button size="lg" variant="outline" className="glass-card text-lg px-10 py-7 glow-border-hover" onClick={() => onNavigate("topics")}>
                  Browse Topics →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-10 h-10" />,
                title: "🧠 Learn by Doing",
                description: "Practice with real Python & SQL challenges.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: "💬 Get Instant Feedback",
                description: "Know what's right (and why).",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Cloud className="w-10 h-10" />,
                title: "☁️ Deploy with Confidence",
                description: "Bring your projects to life.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="gradient-border"
              >
                <Card className="glass-card hover-lift glow-border-hover h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 glow-effect`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-24 px-8 relative faq-section-bg">
        {/* Floating Shapes */}
        <div className="floating-shape" style={{ width: '200px', height: '200px', top: '10%', left: '5%' }}></div>
        <div className="floating-shape" style={{ width: '150px', height: '150px', bottom: '20%', right: '10%', animationDelay: '3s' }}></div>
        <div className="floating-shape" style={{ width: '180px', height: '180px', top: '50%', right: '25%', animationDelay: '6s' }}></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl mb-4 underline-animate inline-block">Common Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === index}
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`glass-card accordion-hover ${openFaq === index ? 'glow-border-hover' : ''}`}>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl text-left">{faq.question}</CardTitle>
                          <ChevronDown
                            className={`w-6 h-6 transition-transform ${
                              openFaq === index ? "transform rotate-180" : ""
                            }`}
                          />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="glass-card rounded-xl p-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </motion.div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 px-8 parallax-section">
        <div className="parallax-bg"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6">Technologies</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-standard tools you'll master
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Python", icon: "🐍" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "FastAPI", icon: "⚡" },
              { name: "Docker", icon: "🐳" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="tech-card glass-card rounded-2xl p-10 text-center cursor-pointer relative"
              >
                <div className="tech-icon text-5xl mb-4">{tech.icon}</div>
                <p className="text-xl gradient-text mb-2">{tech.name}</p>
                <p className="tech-tooltip text-sm text-muted-foreground">Click to Learn More</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
