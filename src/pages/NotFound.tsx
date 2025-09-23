import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center shadow-card">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="text-6xl mb-6"
          >
            🧠
          </motion.div>
          
          <h1 className="text-3xl font-bold gradient-text mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            This neural pathway doesn't exist. Let's get you back on track.
          </p>
          
          <div className="space-y-3">
            <Button asChild variant="gradient" size="lg" className="w-full">
              <Link to="/">
                <Home className="w-5 h-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/matches">
                <Search className="w-5 h-5" />
                Find Matches
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFound;
