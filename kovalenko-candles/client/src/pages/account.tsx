import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, Heart, Edit2, Save, X } from "lucide-react";

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
  });

  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setTempUserInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempUserInfo({ ...tempUserInfo, [field]: value });
  };

  // Mock order data
  const orders = [
    {
      id: 1,
      date: "2025-01-15",
      status: "delivered",
      total: 28.99,
      items: [
        { name: "Sunflower Floating Candles", quantity: 1, price: 28.99 }
      ]
    },
    {
      id: 2,
      date: "2025-01-08",
      status: "shipped",
      total: 51.98,
      items: [
        { name: "Lavender Sunflower Candle", quantity: 1, price: 24.99 },
        { name: "Rose Sunflower Candle", quantity: 1, price: 26.99 }
      ]
    },
    {
      id: 3,
      date: "2024-12-25",
      status: "delivered",
      total: 69.99,
      items: [
        { name: "Sunflower Gift Set", quantity: 1, price: 69.99 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-brown mb-6">
              My Account
            </h1>
            <div className="w-24 h-1 bg-sunflower mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your account and track your support for the Kovalenko family.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              My Impact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="card-warm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-2xl text-warm-brown">
                    Profile Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                      className="border-sunflower text-warm-brown hover:bg-sunflower"
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        className="border-gray-300"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="btn-sunflower"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={tempUserInfo.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userInfo.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={tempUserInfo.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userInfo.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={tempUserInfo.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userInfo.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={tempUserInfo.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{userInfo.address}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="card-warm">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-warm-brown">
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-warm-brown">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-bold text-warm-brown mt-1">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <div className="space-y-6">
              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-warm-brown">
                    Your Impact on the Kovalenko Family
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sunflower mb-2">3</div>
                      <p className="text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sunflower mb-2">$150.96</div>
                      <p className="text-gray-600">Total Contributed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sunflower mb-2">5</div>
                      <p className="text-gray-600">Candles Purchased</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sunflower mb-2">Dec 2024</div>
                      <p className="text-gray-600">Supporting Since</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-warm">
                <CardHeader>
                  <CardTitle className="font-display text-xl text-warm-brown">
                    How Your Support Helped
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-sunflower text-warm-brown w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown">Housing Security</h4>
                        <p className="text-gray-600 text-sm">
                          Your purchases helped cover 2 weeks of rent for the family's safe shelter.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-sunset-orange text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown">Ivan's Medical Care</h4>
                        <p className="text-gray-600 text-sm">
                          Contributed to Ivan's routine medical checkups and vitamins.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-ukrainian-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-warm-brown">Sofia's Art Supplies</h4>
                        <p className="text-gray-600 text-sm">
                          Enabled Sofia to purchase new art supplies for her sunflower paintings.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
