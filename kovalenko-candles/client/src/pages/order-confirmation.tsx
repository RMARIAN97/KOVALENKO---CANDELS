import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Mail, ArrowLeft } from "lucide-react";

export default function OrderConfirmationPage() {
  const [, navigate] = useLocation();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('order_id');
    setOrderId(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-warm-brown mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 text-lg">
            Thank you for supporting the Kovalenko family. Your order has been received and is being processed.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-warm-brown">
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sunflower rounded-full p-2">
                  <Mail className="h-5 w-5 text-warm-brown" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-brown">Order Confirmation</h3>
                  <p className="text-gray-600">
                    You'll receive an email confirmation with your order details shortly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sunflower rounded-full p-2">
                  <Package className="h-5 w-5 text-warm-brown" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-brown">Handcrafted with Love</h3>
                  <p className="text-gray-600">
                    Olena and Sofia will carefully handcraft your candles with the same love and attention they put into every piece.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sunflower rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-warm-brown" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-brown">Shipping & Delivery</h3>
                  <p className="text-gray-600">
                    Your order will be carefully packaged and shipped within 2-3 business days. You'll receive tracking information once it's on its way.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {orderId && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 mb-2">Order Number</p>
                <p className="font-mono text-lg font-semibold text-warm-brown">
                  #{orderId}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center space-y-4">
          <div className="bg-soft-cream rounded-lg p-6">
            <h3 className="font-display text-xl font-semibold text-warm-brown mb-2">
              Thank You for Your Support
            </h3>
            <p className="text-gray-600">
              Your purchase directly supports the Kovalenko family's journey toward stability and hope. Every candle you buy helps provide shelter, medical care, and educational opportunities for Sofia and baby Ivan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="btn-sunflower"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate("/products")}
              variant="outline"
              className="border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}