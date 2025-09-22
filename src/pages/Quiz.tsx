import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Brain } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "When making decisions, I tend to:",
    options: [
      "Trust my gut instinct immediately",
      "Analyze all available data first",
      "Seek input from others before deciding",
      "Consider long-term consequences carefully"
    ]
  },
  {
    id: 2,
    question: "In social situations, I feel energized by:",
    options: [
      "Large groups and networking events",
      "Deep one-on-one conversations",
      "Helping others solve problems",
      "Sharing creative ideas and projects"
    ]
  },
  {
    id: 3,
    question: "My ideal weekend involves:",
    options: [
      "Exploring new places or experiences",
      "Reading, learning something new",
      "Spending quality time with loved ones",
      "Working on personal creative projects"
    ]
  },
  {
    id: 4,
    question: "When facing challenges, I typically:",
    options: [
      "Tackle them head-on with determination",
      "Break them down into smaller steps",
      "Collaborate with others for solutions",
      "Look for innovative approaches"
    ]
  },
  {
    id: 5,
    question: "What motivates me most is:",
    options: [
      "Achievement and recognition",
      "Understanding and knowledge",
      "Connection and relationships",
      "Creating something meaningful"
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Store answers and navigate to processing
        localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
        navigate("/processing");
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text mb-2">Mindprint Quiz</h1>
          <p className="text-muted-foreground">Discover your unique cognitive signature</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 shadow-card">
              <h2 className="text-xl font-semibold mb-6 leading-relaxed">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedOption === index
                        ? "border-primary bg-accent text-accent-foreground shadow-soft"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
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
                      <span className="text-sm font-medium">{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between mt-8"
        >
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedOption === null}
            variant="gradient"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Quiz;