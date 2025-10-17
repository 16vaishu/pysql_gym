import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Code2, ArrowLeft, User, Settings, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "./Footer";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function ProfilePage({ onNavigate, darkMode, toggleDarkMode }: ProfilePageProps) {
  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-12">
              <h1 className="text-5xl mb-4">Profile</h1>
              <p className="text-xl text-muted-foreground">Manage your account and preferences</p>
            </div>

            {/* Profile Information */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <User className="w-7 h-7" />
                  Profile Information
                </CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8 mb-12 pb-12 border-b border-white/10">
                  <div className="w-32 h-32 rounded-2xl gradient-bg flex items-center justify-center glow-effect">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="h-6 w-48 glass-card rounded mb-3"></div>
                    <div className="h-4 w-64 glass-card rounded mb-6"></div>
                    <Button variant="outline" className="glass-card">
                      Change Avatar
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-base mb-3 block">Full Name</Label>
                      <Input placeholder="Enter your name" className="glass-card border-none h-14 text-base" />
                    </div>
                    <div>
                      <Label className="text-base mb-3 block">Username</Label>
                      <Input placeholder="Enter username" className="glass-card border-none h-14 text-base" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Email Address</Label>
                    <Input placeholder="Enter email" type="email" className="glass-card border-none h-14 text-base" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Settings className="w-7 h-7" />
                  Preferences
                </CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <div>
                    <p className="text-lg mb-1">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <div>
                    <p className="text-lg mb-1">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-lg mb-1">Quiz Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded about pending quizzes</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Question */}
            <Card className="glass-card mb-8 border-primary/20">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-lg mb-2">Where is my progress stored?</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Your learning progress is automatically saved in your browser's local storage. This means your progress is available whenever you use the same browser on this device. For cross-device access, we recommend bookmarking your favorite topics.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="gradient-bg glow-effect flex-1 h-14 text-base">
                Save Changes
              </Button>
              <Button variant="outline" className="glass-card flex-1 h-14 text-base" onClick={() => onNavigate("home")}>
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
