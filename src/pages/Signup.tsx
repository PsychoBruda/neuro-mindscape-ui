import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Brain, User, Sparkles } from "lucide-react";

const avatars = [
  "🌟", "🎨", "🎭", "🌸", "🍀", "🌙", "☀️", "🦋",
  "🎪", "🌈", "🎯", "🎲", "🧩", "🎪", "🔮", "🌺"
];

const Signup = () => {
  const [pseudonym, setPseudonym] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (pseudonym.trim()) {
      // Store user data
      localStorage.setItem("user", JSON.stringify({ pseudonym, avatar: selectedAvatar }));
      navigate("/quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 glass border-0 shadow-hero">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome to NeuroMatch</h1>
            <p className="text-muted-foreground">Create your anonymous profile to begin</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Choose your pseudonym</label>
              <Input
                placeholder="Enter a unique name..."
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Pick your avatar</label>
              <div className="grid grid-cols-8 gap-2">
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      selectedAvatar === avatar
                        ? "bg-gradient-primary shadow-card scale-110"
                        : "bg-secondary hover:bg-accent"
                    }`}
                  >
                    {avatar}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bg-soft-lavender/50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Privacy First</p>
                  <p className="text-muted-foreground">
                    We only use your mindprint for matching. No personal data is stored or shared.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSignup}
              disabled={!pseudonym.trim()}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              <User className="w-5 h-5" />
              Create Profile & Start Quiz
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have a profile?{" "}
              <Link to="/quiz" className="text-primary hover:underline">
                Take the quiz
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;