import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, Lock } from "lucide-react";
import { useLocation } from "wouter";

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    getTotalPrice 
  } = useCart();
  const [, navigate] = useLocation();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl font-bold text-warm-brown">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-4">🕯️</div>
              <p>Your cart is empty</p>
              <p className="text-sm mt-2">Add some candles to spread the light!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{formatPrice(parseFloat(item.product.price))}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Badge variant="secondary" className="px-2 py-1">
                      {item.quantity}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-warm-brown">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <Button
              className="w-full btn-sunflower"
              size="lg"
              onClick={handleCheckout}
            >
              <Lock className="mr-2 h-5 w-5" />
              Secure Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
