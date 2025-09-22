import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Settings, 
  Sparkles, 
  Target,
  Brain,
  Lightbulb,
  Heart,
  Zap
} from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const profileData = [
  { trait: "Analytical", value: 85 },
  { trait: "Creative", value: 72 },
  { trait: "Social", value: 68 },
  { trait: "Intuitive", value: 90 },
  { trait: "Practical", value: 75 },
  { trait: "Empathetic", value: 82 }
];

const traits = [
  { icon: Brain, label: "Deep Thinker", color: "bg-blue-100 text-blue-700" },
  { icon: Lightbulb, label: "Creative", color: "bg-yellow-100 text-yellow-700" },
  { icon: Heart, label: "Empathetic", color: "bg-pink-100 text-pink-700" },
  { icon: Target, label: "Goal-Oriented", color: "bg-green-100 text-green-700" },
  { icon: Zap, label: "Intuitive", color: "bg-purple-100 text-purple-700" }
];

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">{user.avatar || "🌟"}</div>
            <h1 className="text-3xl font-bold mb-2">{user.pseudonym || "Anonymous"}</h1>
            <p className="text-white/80">Your unique mindprint is ready</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Mindprint Radar */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Mindprint
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={profileData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" className="text-xs" />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={false}
                    />
                    <Radar
                      name="Profile"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/matches">
                    <Users className="w-4 h-4" />
                    View Matches
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/daily">
                    <Calendar className="w-4 h-4" />
                    Daily Check-in
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/settings">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personality Traits */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Personality Traits</h3>
              <div className="flex flex-wrap gap-3">
                {traits.map((trait, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                      <trait.icon className="w-4 h-4 mr-2" />
                      {trait.label}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Compatibility Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Compatibility Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-soft-green rounded-lg">
                  <h4 className="font-medium text-soft-green-dark mb-2">Best Matches</h4>
                  <p className="text-sm text-muted-foreground">
                    People who share your analytical nature but complement your creative side
                  </p>
                </div>
                <div className="p-4 bg-soft-coral rounded-lg">
                  <h4 className="font-medium text-soft-coral-dark mb-2">Growth Areas</h4>
                  <p className="text-sm text-muted-foreground">
                    Connecting with more spontaneous and adventurous personalities
                  </p>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Completed mindprint quiz</span>
                  <span className="text-xs text-muted-foreground ml-auto">Just now</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent rounded-lg opacity-50">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <span className="text-sm">Daily check-in available</span>
                  <span className="text-xs text-muted-foreground ml-auto">Tomorrow</span>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center">
              <Button asChild variant="gradient" size="lg">
                <Link to="/matches">
                  <Users className="w-5 h-5" />
                  Discover Your Matches
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;