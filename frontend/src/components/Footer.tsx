import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="glass-footer mt-auto footer-glass-border">
      <div className="container mx-auto px-8 py-16">
        <div className="text-center">
          <p className="footer-text text-muted-foreground mb-2 text-lg transition-all duration-300 cursor-default">
            Built with ❤️ and a little bit of Python Magic 🪄
          </p>
          <p className="footer-text text-muted-foreground mb-8 transition-all duration-300 cursor-default">
            © 2025 PySQL Gym | Keep Learning, Keep Shipping 🚀
          </p>
          
          <div className="flex justify-center gap-6">
            {[
              { icon: <Github className="w-6 h-6" />, href: "https://github.com", label: "GitHub", type: "github" },
              { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com", label: "LinkedIn", type: "linkedin" },
              { icon: <Mail className="w-6 h-6" />, href: "mailto:hello@pysqlgym.com", label: "Email", type: "email" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`footer-icon ${social.type} w-14 h-14 rounded-full glass-card flex items-center justify-center text-muted-foreground`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
