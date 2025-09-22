import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Trash2, 
  Download,
  RefreshCw,
  LogOut
} from "lucide-react";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [pseudonym, setPseudonym] = useState(user.pseudonym || "");
  const [notifications, setNotifications] = useState(true);
  const [dataProcessing, setDataProcessing] = useState(true);
  const [matchVisibility, setMatchVisibility] = useState(true);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, pseudonym };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Show success toast
  };

  const handleExportData = () => {
    const userData = {
      profile: JSON.parse(localStorage.getItem("user") || "{}"),
      quizAnswers: JSON.parse(localStorage.getItem("quizAnswers") || "[]"),
      lastCheckin: localStorage.getItem("lastDailyCheckin")
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "neuromatch-data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

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
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-white/80">Manage your NeuroMatch experience</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Profile Settings</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{user.avatar || "🌟"}</div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Pseudonym</label>
                    <Input
                      value={pseudonym}
                      onChange={(e) => setPseudonym(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} variant="outline" className="w-full">
                  Save Profile Changes
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Privacy & Data</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Match Visibility</p>
                    <p className="text-sm text-muted-foreground">Allow others to see you as a potential match</p>
                  </div>
                  <Switch checked={matchVisibility} onCheckedChange={setMatchVisibility} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Processing</p>
                    <p className="text-sm text-muted-foreground">Allow AI analysis of your responses for better matching</p>
                  </div>
                  <Switch checked={dataProcessing} onCheckedChange={setDataProcessing} />
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleExportData} variant="outline" className="w-full">
                    <Download className="w-4 h-4" />
                    Export My Data
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Notifications</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Matches</p>
                    <p className="text-sm text-muted-foreground">Get notified when you have new compatible matches</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Check-in Reminders</p>
                    <p className="text-sm text-muted-foreground">Gentle reminders to update your mindprint</p>
                  </div>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Chat Messages</p>
                    <p className="text-sm text-muted-foreground">New message alerts from your matches</p>
                  </div>
                  <Switch checked={true} onCheckedChange={() => {}} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Account Actions</h2>

              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/quiz">
                    <RefreshCw className="w-4 h-4" />
                    Retake Mindprint Quiz
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>

                <Button 
                  onClick={handleDeleteAccount}
                  variant="destructive" 
                  className="w-full justify-start"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-soft-lavender/50">
              <h3 className="font-medium mb-2">Your Privacy Matters</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                NeuroMatch is built with privacy-first principles. We only process your data to improve 
                matching quality and never share personal information. Your pseudonymous profile ensures 
                authentic connections while protecting your identity.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;