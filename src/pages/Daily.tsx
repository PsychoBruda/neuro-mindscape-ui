import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, CheckCircle, Sparkles } from "lucide-react";

const dailyQuestions = [
  {
    id: 1,
    question: "Right now I'm feeling most:",
    type: "mood",
    options: [
      { label: "Energized & focused", emoji: "⚡" },
      { label: "Calm & reflective", emoji: "🌙" },
      { label: "Creative & inspired", emoji: "✨" },
      { label: "Social & connected", emoji: "💫" }
    ]
  },
  {
    id: 2,
    question: "Today I want to:",
    type: "intention",
    options: [
      { label: "Learn something new", emoji: "📚" },
      { label: "Connect with others", emoji: "🤝" },
      { label: "Create something beautiful", emoji: "🎨" },
      { label: "Find inner peace", emoji: "🧘" }
    ]
  },
  {
    id: 3,
    question: "I feel most like myself when:",
    type: "authenticity",
    options: [
      { label: "Solving complex problems", emoji: "🧩" },
      { label: "Helping others grow", emoji: "🌱" },
      { label: "Expressing my creativity", emoji: "🎭" },
      { label: "Exploring new ideas", emoji: "🚀" }
    ]
  }
];

const Daily = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / dailyQuestions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);

      if (currentQuestion < dailyQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setIsComplete(true);
        // Store daily check-in data
        localStorage.setItem("lastDailyCheckin", new Date().toISOString());
      }
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 glass border-0 shadow-hero text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 bg-success rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold gradient-text mb-4">
              Daily Check-in Complete!
            </h1>
            <p className="text-muted-foreground mb-8">
              Your mindprint has been updated with today's insights
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-soft-green rounded-lg">
                <p className="text-sm font-medium text-soft-green-dark mb-1">
                  Mindprint Updated
                </p>
                <p className="text-xs text-muted-foreground">
                  +5 data points added to your profile
                </p>
              </div>
              <div className="p-4 bg-soft-coral rounded-lg">
                <p className="text-sm font-medium text-soft-coral-dark mb-1">
                  New Matches Available
                </p>
                <p className="text-xs text-muted-foreground">
                  2 new compatible minds discovered
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild variant="gradient" size="lg" className="w-full">
                <Link to="/matches">
                  <Sparkles className="w-5 h-5" />
                  View New Matches
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/profile">
                  Return to Profile
                </Link>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Link to="/profile">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Daily Check-in
              </h1>
              <p className="text-white/80">Keep your mindprint fresh and accurate</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {dailyQuestions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 shadow-card">
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">
                {dailyQuestions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`p-6 text-left rounded-xl border-2 transition-all ${
                      selectedOption === index
                        ? "border-primary bg-accent shadow-soft"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{option.emoji}</div>
                      <div className="flex-1">
                        <p className="font-medium">{option.label}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedOption === index
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {selectedOption === index && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={handleNext}
              disabled={selectedOption === null}
              variant="gradient"
              size="lg"
            >
              {currentQuestion === dailyQuestions.length - 1 ? "Complete Check-in" : "Next Question"}
              <Sparkles className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Daily;