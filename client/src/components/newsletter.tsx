import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our family updates.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 ukraine-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
          Stay Connected with Our Journey
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Receive monthly updates about our family, new candle designs, and how your support continues to make a difference.
        </p>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
          <div className="mb-6">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-lg"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full btn-sunflower text-lg"
            size="lg"
            disabled={isLoading}
          >
            <Mail className="mr-2 h-5 w-5" />
            {isLoading ? "Joining..." : "Join Our Family Updates"}
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}
