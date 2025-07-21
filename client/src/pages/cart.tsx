import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  ArrowRight,
  Heart,
  ArrowLeft
} from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  const [, navigate] = useLocation();
  const [promoCode, setPromoCode] = useState("");

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 8.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              Your Cart
            </h1>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty Cart State */
          <Card className="card-warm max-w-md mx-auto">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-6">🕯️</div>
              <h2 className="font-display text-2xl font-bold text-warm-brown mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some beautiful candles to support the Kovalenko family and spread the light of hope.
              </p>
              <Button
                onClick={handleContinueShopping}
                className="btn-sunflower"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Cart Items ({getTotalItems()})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-6 p-4 border rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-display text-xl font-bold text-warm-brown">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.product.scent} • {item.product.burnTime}
                          </p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-4 py-2 font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-warm-brown">
                            {formatPrice(parseFloat(item.product.price) * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(parseFloat(item.product.price))} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Family Impact Message */}
              <Card className="sunflower-gradient border-none">
                <CardContent className="p-8 text-warm-brown">
                  <h3 className="font-display text-2xl font-bold mb-4 flex items-center">
                    <Heart className="mr-2 h-6 w-6 text-red-600" />
                    Your Impact on the Kovalenko Family
                  </h3>
                  <p className="text-lg mb-4">
                    Your purchase of {getTotalItems()} candle{getTotalItems() > 1 ? 's' : ''} will provide:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        ✓
                      </div>
                      <span className="text-lg">
                        {Math.ceil(getTotalItems() * 2)} days of nutritious meals
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        ✓
                      </div>
                      <span className="text-lg">
                        Art supplies for Sofia's education
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-warm-brown text-sunflower w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        ✓
                      </div>
                      <span className="text-lg">
                        Medical care for baby Ivan
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-warm-brown">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {subtotal < 50 && (
                    <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                      Add {formatPrice(50 - subtotal)} more for free shipping
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-warm-brown">{formatPrice(total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="text-lg text-warm-brown">
                    Promo Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outline"
                      className="border-sunflower text-warm-brown hover:bg-sunflower"
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                className="w-full btn-sunflower text-lg py-6"
                size="lg"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full border-sunflower text-warm-brown hover:bg-sunflower"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>

              {/* Security Badge */}
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
