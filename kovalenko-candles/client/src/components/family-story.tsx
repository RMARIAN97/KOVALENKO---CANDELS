import { Card, CardContent } from "@/components/ui/card";
import { Home, HeartHandshake, FlameKindling } from "lucide-react";

export default function FamilyStory() {
  return (
    <section id="story" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Happy family portrait" 
              className="rounded-2xl shadow-2xl w-full animate-float" 
            />
            
            <Card className="bg-soft-cream border-none">
              <CardContent className="p-8">
                <blockquote className="font-script text-2xl text-warm-brown text-center italic">
                  "Every candle we make carries the warmth of Petro's love and the light of our hope for tomorrow."
                </blockquote>
                <p className="text-center text-gray-600 mt-4">— Olena Kovalenko</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="sunflower-gradient border-none">
              <CardContent className="p-6 text-warm-brown">
                <h3 className="font-display text-2xl font-bold mb-4 flex items-center">
                  <Home className="mr-2 h-6 w-6" />
                  Before the War
                </h3>
                <p className="text-lg leading-relaxed">
                  In a small village nestled among Ukraine's rolling sunflower fields, the Kovalenko family lived a simple but joyful life. Petro crafted furniture with loving hands, while Olena taught music to local children. Their daughter Sofia dreamed of becoming a painter, and baby Ivan brought laughter to their cozy home.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-ukrainian-blue border-none">
              <CardContent className="p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-4 flex items-center">
                  <HeartHandshake className="mr-2 h-6 w-6" />
                  The Sacrifice
                </h3>
                <p className="text-lg leading-relaxed">
                  When Russia's invasion swept through Ukraine, Petro felt a duty to protect his homeland. "I'll be back, my love," he told Olena. He joined the fight but was killed in a missile strike while saving his squad. His sacrifice left Olena alone with two young children in a war-torn village.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-sunset-orange border-none">
              <CardContent className="p-6 text-white">
                <h3 className="font-display text-2xl font-bold mb-4 flex items-center">
                  <FlameKindling className="mr-2 h-6 w-6" />
                  Finding Light
                </h3>
                <p className="text-lg leading-relaxed">
                  Starting from nothing, Olena began making candles using wax from Petro's old supplies. Sofia helps by drawing sunflower designs on the labels. Each candle represents their fight to survive, their determination to honor Petro's memory, and their hope for a brighter future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
