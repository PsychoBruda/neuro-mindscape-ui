import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles, Target, Users } from "lucide-react";

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const processingSteps = [
    { icon: Brain, label: "Analyzing your mindprint", delay: 0 },
    { icon: Target, label: "Identifying patterns", delay: 1 },
    { icon: Users, label: "Finding compatible matches", delay: 2 },
    { icon: Sparkles, label: "Preparing your profile", delay: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 glass border-0 shadow-hero text-center">
          {/* Main Loading Animation */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6"
            >
              <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Pulse Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 2, 2],
                  opacity: [1, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              />
            ))}
          </div>

          <h1 className="text-2xl font-bold gradient-text mb-2">
            Creating Your Mindprint
          </h1>
          <p className="text-muted-foreground mb-8">
            Our AI is analyzing your responses to build your unique cognitive profile
          </p>

          {/* Processing Steps */}
          <div className="space-y-4">
            {processingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay * 0.8 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium">{step.label}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (step.delay + 1) * 0.8 }}
                  className="ml-auto w-2 h-2 bg-success rounded-full"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Almost ready...
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Processing;