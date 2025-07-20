import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/hero";
import FamilyStory from "@/components/family-story";
import ProductCard from "@/components/product-card";
import Newsletter from "@/components/newsletter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Heart,
  GraduationCap,
  Utensils,
  DollarSign,
  Users,
  Star,
} from "lucide-react";
import type { Product } from "@shared/schema";

export default function HomePage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts =
    products?.filter((product) => product.featured) || [];
  const regularProducts =
    products?.filter((product) => !product.featured).slice(0, 4) || [];

  const testimonials = [
    {
      name: "Maria Rodriguez",
      location: "Austin, TX",
      rating: 5,
      text: "These candles are absolutely beautiful and the story behind them is so moving. I feel honored to support this brave family. The sunflower floating candles were perfect for our family dinner.",
    },
    {
      name: "Jennifer Chen",
      location: "Seattle, WA",
      rating: 5,
      text: "The quality is exceptional and knowing that my purchase helps a family in need makes it even more special. The lavender scent is divine and lasts for hours.",
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      rating: 5,
      text: "I bought the gift set for my mother and she was moved to tears when she read the story. The candles are gorgeous and burn so evenly. We'll definitely be ordering more.",
    },
  ];

  return (
    <>
      <Hero />
      <FamilyStory />

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Handcrafted with Love
            </h2>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each candle is carefully crafted by Olena and Sofia, infused with
              the warmth of their love and the hope of their dreams.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-sunflower border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading our beautiful candles...</p>
            </div>
          ) : (
            <>
              {/* Featured Products */}
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} featured />
              ))}

              {/* Regular Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {regularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 sunflower-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              How Your Purchase Helps
            </h2>
            <div className="w-24 h-1 bg-warm-brown mx-auto mb-8"></div>
            <p className="text-xl text-warm-brown max-w-3xl mx-auto">
              Every candle sold brings us one step closer to stability, hope,
              and healing. Here's how your support makes a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="card-warm text-center">
              <CardContent className="p-8">
                <div className="bg-ukrainian-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-warm-brown mb-2">
                  Secure Housing
                </h3>
                <p className="text-gray-600">
                  Funds help us maintain our shelter and eventually find a
                  permanent home for our family.
                </p>
              </CardContent>
            </Card>

            <Card className="card-warm text-center">
              <CardContent className="p-8">
                <div className="bg-sunset-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-warm-brown mb-2">
                  Medical Care
                </h3>
                <p className="text-gray-600">
                  Ensuring Ivan gets the medical attention he needs and Sofia
                  receives trauma support.
                </p>
              </CardContent>
            </Card>

            <Card className="card-warm text-center">
              <CardContent className="p-8">
                <div className="bg-warm-gold text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-warm-brown mb-2">
                  Sofia's Education
                </h3>
                <p className="text-gray-600">
                  Supporting Sofia's dreams of becoming an artist and continuing
                  her education despite the war.
                </p>
              </CardContent>
            </Card>

            <Card className="card-warm text-center">
              <CardContent className="p-8">
                <div className="bg-ukrainian-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-warm-brown mb-2">
                  Daily Necessities
                </h3>
                <p className="text-gray-600">
                  Providing nutritious food, warm clothing, and essential
                  supplies for our growing family.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-warm">
            <CardContent className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-3xl font-bold text-warm-brown mb-6">
                    Monthly Impact Goal
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    We're working toward selling 200 candles per month to cover
                    our basic needs and start saving for a more stable future.
                    Every purchase brings us closer to this goal.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Progress</span>
                      <span className="font-bold text-warm-brown">
                        127 / 200 candles
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-sunflower to-warm-gold h-4 rounded-full transition-all duration-300"
                        style={{ width: "63.5%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      63.5% to monthly goal
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-soft-cream rounded-xl">
                    <div className="bg-sunflower text-warm-brown w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown">
                        Monthly Income Goal
                      </h4>
                      <p className="text-gray-600">
                        $4,800 for basic living expenses
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-soft-cream rounded-xl">
                    <div className="bg-ukrainian-blue text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown">
                        Families Helped
                      </h4>
                      <p className="text-gray-600">
                        Supporting 3 other war-affected families
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-soft-cream rounded-xl">
                    <div className="bg-sunset-orange text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown">
                        Hope Renewed
                      </h4>
                      <p className="text-gray-600">
                        Every purchase restores our faith in humanity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Hearts Touched by Light
            </h2>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read what our customers say about how our candles have brightened
              their homes and hearts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-soft-cream to-white border-none shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="flex text-sunflower text-xl mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="bg-sunflower text-warm-brown w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <span className="font-bold text-lg">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-warm-brown">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
