import { Button } from "@/components/ui/button";
import { Heart, BookOpen } from "lucide-react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center hero-overlay"
        style={{
          backgroundImage: "url('https://pixabay.com/get/g328522e93f225c562f32c8fbc144261179b68bdac63e17b8eeb7b8daa2c25195ce49cb2380826713b19beca4b4baa71c9d470424706f6ec9dbc1b5c289b3d478_1280.jpg')"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Light of Hope from Ukraine
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Every candle tells our story. Every purchase brings light to our family's journey of resilience and hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-sunflower text-lg px-8 py-4"
              onClick={() => scrollToSection('products')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Support the Kovalenko Family
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-warm-brown border-white text-lg px-8 py-4"
              onClick={() => scrollToSection('story')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
