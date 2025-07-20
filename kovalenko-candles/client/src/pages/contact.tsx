import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Get in Touch
            </h1>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message or reach out through our social channels.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-warm">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-warm-brown">
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 focus:ring-sunflower focus:border-sunflower"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 focus:ring-sunflower focus:border-sunflower"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 focus:ring-sunflower focus:border-sunflower"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full btn-sunflower"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-warm-brown">
                  Connect with Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-sunflower text-warm-brown w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-brown">Email</h4>
                    <p className="text-gray-600">olena.kovalenko@candlelight.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-ukrainian-blue text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-brown">Phone</h4>
                    <p className="text-gray-600">+380 (XX) XXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-warm-gold text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-warm-brown">Location</h4>
                    <p className="text-gray-600">Ukraine (Exact location kept private for security)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-warm-brown">
                  Follow Our Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-sunflower hover:bg-warm-gold text-warm-brown w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-sunset-orange hover:bg-warm-gold text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-ukrainian-blue hover:bg-warm-gold text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Family Updates Card */}
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-warm-brown">
                  Recent Update
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-sunflower text-warm-brown w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown">January 15, 2025</h4>
                      <p className="text-sm text-gray-500">Recent Update</p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-warm-brown">Sofia's First Art Exhibition</h4>
                  <p className="text-gray-600 text-sm">
                    Sofia's artwork featuring sunflowers and Ukrainian landscapes was displayed at the local community center. She sold three paintings and donated half the proceeds to help other war-affected families.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
