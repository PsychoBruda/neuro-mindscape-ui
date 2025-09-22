import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, Shield, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Mindprint",
    description: "Our advanced AI analyzes your cognitive patterns to create a unique personality signature"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Anonymous profiles protect your identity while enabling authentic connections"
  },
  {
    icon: Users,
    title: "Compatible Minds",
    description: "Connect with people who truly understand your thought processes and perspectives"
  }
];

const benefits = [
  "Find people who think like you",
  "Build meaningful connections",
  "Discover your cognitive strengths",
  "Join a community of mindful individuals"
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8"
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your
              <span className="block gradient-text bg-gradient-to-r from-white to-white/70 bg-clip-text">
                Cognitive Match
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              NeuroMatch uses AI to analyze your unique mindprint and connect you with 
              people who share your cognitive wavelength
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="soft" size="xl" className="bg-white text-primary hover:bg-white/90">
                <Link to="/signup">
                  <Sparkles className="w-6 h-6" />
                  Start Your Journey
                </Link>
              </Button>
              <Button asChild variant="ghost" size="xl" className="text-white border-white/20 hover:bg-white/10">
                <Link to="/quiz">
                  Take the Quiz
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered matching system goes beyond surface-level compatibility
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Card className="p-8 text-center hover-lift h-full">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose NeuroMatch?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Traditional dating and networking apps focus on surface-level attributes. 
                NeuroMatch dives deeper to understand your cognitive essence.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button asChild variant="gradient" size="lg">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="p-8 glass shadow-hero">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-2">Your Mindprint</h3>
                  <p className="text-muted-foreground">A unique cognitive fingerprint</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-soft-green rounded-lg">
                    <span className="text-sm font-medium">Analytical Thinking</span>
                    <span className="text-sm font-bold text-soft-green-dark">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-soft-coral rounded-lg">
                    <span className="text-sm font-medium">Creative Expression</span>
                    <span className="text-sm font-bold text-soft-coral-dark">87%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-soft-lavender rounded-lg">
                    <span className="text-sm font-medium">Empathetic Connection</span>
                    <span className="text-sm font-bold text-soft-lavender-dark">94%</span>
                  </div>
                </div>
              </Card>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-card"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Privacy-First Matching</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your data stays anonymous and secure. We analyze cognitive patterns without storing 
              personal information, ensuring authentic connections while protecting your privacy.
            </p>
            
            <Card className="p-8 bg-soft-lavender/30 border-dashed border-2 border-primary/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">End-to-end encrypted</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">Anonymous by design</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">No personal data storage</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Cognitive Match?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of people discovering meaningful connections through mindprint matching
            </p>
            
            <Button asChild variant="soft" size="xl" className="bg-white text-primary hover:bg-white/90">
              <Link to="/signup">
                <Brain className="w-6 h-6" />
                Create Your Mindprint
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
