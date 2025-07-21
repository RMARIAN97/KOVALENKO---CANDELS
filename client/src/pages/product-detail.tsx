import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Heart, 
  Clock, 
  Flame,
  Package
} from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleBackToProducts = () => {
    navigate("/products");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-sunflower border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading candle details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
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
              Candle Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The candle you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={handleBackToProducts} className="btn-sunflower">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={handleBackToProducts}
            className="text-gray-600 hover:text-sunflower"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-sunflower text-warm-brown hover:bg-warm-gold">
                  <Star className="mr-1 h-4 w-4" />
                  Featured
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            {/* Product Story */}
            <Card className="bg-soft-cream border-none">
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-bold text-warm-brown mb-4">
                  Sofia's Touch
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Each candle label is hand-drawn by Sofia, our 12-year-old artist, who sketches 
                  sunflower designs as a tribute to her father's love for Ukraine's golden fields. 
                  Every purchase supports her dream of becoming a professional painter while helping 
                  our family rebuild from the ashes of war.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="flex text-sunflower text-xl mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(127 reviews)</span>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <Card className="card-warm">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-warm-brown mb-4">
                  Product Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 text-sunset-orange mr-3" />
                    <div>
                      <span className="font-semibold text-warm-brown">Scent:</span>
                      <span className="text-gray-600 ml-2">{product.scent}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-ukrainian-blue mr-3" />
                    <div>
                      <span className="font-semibold text-warm-brown">Burn Time:</span>
                      <span className="text-gray-600 ml-2">{product.burnTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-warm-gold mr-3" />
                    <div>
                      <span className="font-semibold text-warm-brown">Category:</span>
                      <span className="text-gray-600 ml-2 capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price and Add to Cart */}
            <Card className="card-warm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl font-bold text-warm-brown">
                    ${product.price}
                  </div>
                  <Badge 
                    variant={product.inStock ? "default" : "destructive"}
                    className={product.inStock ? "bg-green-100 text-green-800" : ""}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                
                <Button
                  size="lg"
                  className="w-full btn-sunflower text-lg py-6"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-6 w-6" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <p className="text-center text-gray-600 mt-4">
                  <Heart className="inline h-4 w-4 mr-1 text-red-500" />
                  Every purchase directly supports the Kovalenko family
                </p>
              </CardContent>
            </Card>

            {/* Impact Message */}
            <Card className="sunflower-gradient border-none">
              <CardContent className="p-8 text-warm-brown">
                <h3 className="font-display text-2xl font-bold mb-4">
                  How This Purchase Helps
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <p className="text-lg">
                      Provides 3 days of nutritious meals for Sofia and Ivan
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <p className="text-lg">
                      Contributes to Sofia's art supplies and education
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <p className="text-lg">
                      Helps maintain their safe shelter and basic needs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold text-warm-brown text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                location: "Portland, OR",
                text: "This candle is absolutely beautiful and the story behind it brought tears to my eyes. The sunflower scent is divine and it burns so evenly.",
                rating: 5
              },
              {
                name: "Michael Chen",
                location: "San Francisco, CA", 
                text: "Knowing that my purchase helps this brave family makes it even more special. The quality is exceptional and the packaging is gorgeous.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                location: "Miami, FL",
                text: "I've ordered multiple candles and each one is perfect. Sofia's artwork on the labels is so touching. Will definitely order again.",
                rating: 5
              }
            ].map((review, index) => (
              <Card key={index} className="card-warm">
                <CardContent className="p-6">
                  <div className="flex text-sunflower text-lg mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{review.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-warm-brown">{review.name}</p>
                    <p className="text-gray-500 text-sm">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
