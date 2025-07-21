import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (featured) {
    return (
      <Card className="card-warm mb-16">
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-6">
              <Badge className="bg-sunflower text-warm-brown hover:bg-warm-gold">
                <Star className="mr-1 h-4 w-4" />
                Featured Product
              </Badge>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-warm-brown mb-6">
              {product.name}
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="flex items-center mb-8">
              <div className="flex text-sunflower text-xl mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(127 reviews)</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-warm-brown">
                ${product.price}
              </div>
              <Button
                size="lg"
                className="btn-sunflower"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sunflower/20 to-transparent"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-warm">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover" 
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display text-xl font-bold text-warm-brown">
            {product.name}
          </h4>
          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-warm-brown">
            ${product.price}
          </span>
          <Button
            className="btn-sunflower"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
