import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Code2, ArrowLeft, Send, Github, Linkedin, Mail, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onNavigate("home")} className="glass-card">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center glow-effect">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl gradient-text">PySQL Gym</span>
          </div>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="flex-1 p-8 relative overflow-hidden">
        {/* Floating Glow Circles */}
        <div className="floating-bubble w-64 h-64 top-20 right-10" style={{ animationDelay: '0s' }}></div>
        <div className="floating-bubble w-48 h-48 bottom-40 left-20" style={{ animationDelay: '4s' }}></div>
        <div className="floating-bubble w-56 h-56 top-1/2 left-1/3" style={{ animationDelay: '8s' }}></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text & Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h1 className="text-6xl mb-6">
                  <span className="wave-hand inline-block">👋</span> Let's Connect!
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                  Got a question, idea, or bug to squash?
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Drop us a message — we promise the bots are friendly <span className="inline-block">🤖</span>
                </p>
              </div>

              {/* Floating Icons */}
              <div className="space-y-6 mb-8">
                {[
                  { icon: <MessageCircle className="w-6 h-6" />, text: "Quick Response Times", delay: 0 },
                  { icon: <Sparkles className="w-6 h-6" />, text: "Friendly Support Team", delay: 0.2 },
                  { icon: <Code2 className="w-6 h-6" />, text: "Developer-First Approach", delay: 0.4 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay }}
                    className="flex items-center gap-4 glass-card p-4 rounded-xl hover-lift"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white glow-effect">
                      {item.icon}
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {[
                  { icon: <Github className="w-6 h-6" />, label: "Visit us on GitHub", href: "https://github.com" },
                  { icon: <Linkedin className="w-6 h-6" />, label: "Connect on LinkedIn", href: "https://linkedin.com" },
                  { icon: <Mail className="w-6 h-6" />, label: "Email us directly", href: "mailto:hello@pysqlgym.com" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className="relative w-14 h-14 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-effect transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 glass-card px-3 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-card glow-border-hover">
                <CardContent className="p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm mb-2">Name</label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your awesome name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`glass-card border-none h-14 text-base transition-all ${
                            focusedField === "name" ? "ring-2 ring-primary glow-effect" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm mb-2">Email</label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`glass-card border-none h-14 text-base transition-all ${
                            focusedField === "email" ? "ring-2 ring-primary glow-effect" : ""
                          }`}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm mb-2">Message</label>
                        <Textarea
                          id="message"
                          placeholder="Tell us what's on your mind..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={6}
                          className={`glass-card border-none text-base transition-all resize-none ${
                            focusedField === "message" ? "ring-2 ring-primary glow-effect" : ""
                          }`}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gradient-bg glow-effect h-14 text-base gradient-pulse"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 glow-effect">
                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl mb-3">✨ Message Sent!</h3>
                      <p className="text-muted-foreground">You're awesome. We'll get back to you soon!</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
