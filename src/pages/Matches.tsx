import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageCircle, Heart, Sparkles, ArrowLeft, Brain } from "lucide-react";

const matches = [
  {
    id: "1",
    avatar: "🎨",
    pseudonym: "ArtfulThinker",
    compatibility: 92,
    traits: ["Creative", "Analytical", "Empathetic"],
    preview: "Loves exploring the intersection of art and psychology",
    lastActive: "Active now",
    matchType: "Perfect Match"
  },
  {
    id: "2", 
    avatar: "🌙",
    pseudonym: "NightOwlPhilosopher",
    compatibility: 87,
    traits: ["Deep Thinker", "Intuitive", "Curious"],
    preview: "Enjoys late-night conversations about meaning and purpose",
    lastActive: "2 hours ago",
    matchType: "Great Match"
  },
  {
    id: "3",
    avatar: "🌸",
    pseudonym: "BloomingMind",
    compatibility: 84,
    traits: ["Nurturing", "Creative", "Growth-Oriented"],
    preview: "Passionate about personal development and helping others grow",
    lastActive: "1 day ago", 
    matchType: "Good Match"
  }
];

const Matches = () => {
  const getMatchColor = (compatibility: number) => {
    if (compatibility >= 90) return "text-success";
    if (compatibility >= 85) return "text-warning";
    return "text-primary";
  };

  const getMatchBadgeVariant = (matchType: string) => {
    if (matchType === "Perfect Match") return "default";
    if (matchType === "Great Match") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Link to="/profile">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Your Matches</h1>
              <p className="text-white/80">People who share your cognitive wavelength</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Match Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{matches.length}</div>
            <p className="text-muted-foreground">Compatible Minds</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">92%</div>
            <p className="text-muted-foreground">Highest Match</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">3</div>
            <p className="text-muted-foreground">Active Chats</p>
          </Card>
        </motion.div>

        {/* Matches List */}
        <div className="space-y-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="p-6 hover-lift">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar & Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{match.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{match.pseudonym}</h3>
                        <Badge variant={getMatchBadgeVariant(match.matchType)}>
                          {match.matchType}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{match.preview}</p>
                      <p className="text-sm text-muted-foreground">{match.lastActive}</p>
                    </div>
                  </div>

                  {/* Compatibility & Traits */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Compatibility</span>
                        <span className={`text-lg font-bold ${getMatchColor(match.compatibility)}`}>
                          {match.compatibility}%
                        </span>
                      </div>
                      <Progress value={match.compatibility} className="h-2" />
                    </div>

                    <div className="mb-4">
                      <span className="text-sm font-medium mb-2 block">Shared Traits</span>
                      <div className="flex flex-wrap gap-2">
                        {match.traits.map((trait, traitIndex) => (
        <Badge key={traitIndex} variant="secondary" className="text-xs">
          {trait}
        </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button asChild variant="gradient" className="flex-1">
                        <Link to={`/chat/${match.id}`}>
                          <MessageCircle className="w-4 h-4" />
                          Start Chat
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Matches CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-gradient-hero text-white border-0">
            <Brain className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Want More Matches?</h3>
            <p className="text-white/80 mb-6">
              Take our daily micro-test to refine your mindprint and discover new compatible minds
            </p>
            <Button asChild variant="soft" size="lg">
              <Link to="/daily">
                <Sparkles className="w-5 h-5" />
                Take Daily Test
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Matches;