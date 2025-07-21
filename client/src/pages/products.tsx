import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import type { Product } from "@shared/schema";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = [
    { id: "all", name: "All Candles", count: products?.length || 0 },
    { id: "floating", name: "Floating Candles", count: products?.filter(p => p.category === "floating").length || 0 },
    { id: "pillar", name: "Pillar Candles", count: products?.filter(p => p.category === "pillar").length || 0 },
    { id: "gift-set", name: "Gift Sets", count: products?.filter(p => p.category === "gift-set").length || 0 },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products || []
    : products?.filter(product => product.category === selectedCategory) || [];

  const featuredProducts = filteredProducts.filter(product => product.featured);
  const regularProducts = filteredProducts.filter(product => !product.featured);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="font-display text-2xl font-bold text-warm-brown mb-2">
              Unable to Load Products
            </h2>
            <p className="text-gray-600">
              We're having trouble loading our candles. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Our Candle Collection
            </h1>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each candle is lovingly handcrafted by Olena and Sofia, carrying the warmth of our family's story and the hope of Ukraine's golden sunflower fields.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id 
                    ? "btn-sunflower" 
                    : "border-sunflower text-warm-brown hover:bg-sunflower hover:text-warm-brown"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-sunflower border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading our beautiful candles...</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-bold text-warm-brown mb-8 text-center">
                  Featured Products
                </h2>
                <div className="space-y-16">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} featured />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Products */}
            {regularProducts.length > 0 && (
              <div>
                {featuredProducts.length > 0 && (
                  <h2 className="font-display text-3xl font-bold text-warm-brown mb-8 text-center">
                    More Candles
                  </h2>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🕯️</div>
                <h3 className="font-display text-2xl font-bold text-warm-brown mb-2">
                  No Candles Found
                </h3>
                <p className="text-gray-600">
                  Try selecting a different category to see more products.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
