import { 
  users, 
  products, 
  orders, 
  orderItems, 
  newsletterSubscribers, 
  contactMessages,
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStripeCustomerId(id: number, stripeCustomerId: string): Promise<User>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  updateOrderPaymentIntent(id: number, stripePaymentIntentId: string): Promise<Order>;

  // Order items operations
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Newsletter operations
  subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;

  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private products: Map<number, Product> = new Map();
  private orders: Map<number, Order> = new Map();
  private orderItems: Map<number, OrderItem> = new Map();
  private newsletterSubscribers: Map<number, NewsletterSubscriber> = new Map();
  private contactMessages: Map<number, ContactMessage> = new Map();
  
  private userIdCounter = 1;
  private productIdCounter = 1;
  private orderIdCounter = 1;
  private orderItemIdCounter = 1;
  private newsletterIdCounter = 1;
  private contactIdCounter = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Create initial products
    const initialProducts: InsertProduct[] = [
      {
        name: "Sunflower Floating Candles",
        description: "Hand-shaped like the sunflowers from our family's fields, these floating candles bring the warmth of Ukraine to your home. Each set of 6 candles burns for 4-6 hours, creating a golden glow that honors Petro's memory.",
        price: "28.99",
        image: "https://pixabay.com/get/g90e0f61ef6033987adb6a2891a6f34e69f1e0b7ae048fb668d64e18fa0be3c5079ecbd965997c5e4a52ba8b17c0057865e6d8e8139ad46b3208403628a5d8685_1280.jpg",
        category: "floating",
        scent: "Sunflower",
        burnTime: "4-6 hours each",
        inStock: true,
        featured: true,
      },
      {
        name: "Lavender Sunflower Candle",
        description: "Calming lavender scent in a beautiful sunflower pillar design, perfect for peaceful evenings and honoring the quiet moments of hope.",
        price: "24.99",
        image: "https://pixabay.com/get/g3b2d97f62ef800ab390312925b3b24cc41140b3f89c5b9bc9abbf4ffba1f69329ac9903ebc7edb0bbc221bf608d06d9a26342b3d734108d925b04de9325c88e8_1280.jpg",
        category: "pillar",
        scent: "Lavender",
        burnTime: "12-15 hours",
        inStock: true,
        featured: false,
      },
      {
        name: "Rose Sunflower Candle",
        description: "Romantic rose fragrance crafted with love, bringing the beauty of Sofia's drawings to life in every bloom.",
        price: "26.99",
        image: "https://pixabay.com/get/gffc9b205dadb10c0d8fd7ad096c2b8834484f0cfb0788552c5616c84c5c7806f87385407212351f2cdac39fb80f62fd6b4c80328d1c292499f9ac9900beda651_1280.jpg",
        category: "pillar",
        scent: "Rose",
        burnTime: "12-15 hours",
        inStock: true,
        featured: false,
      },
      {
        name: "Jasmine Sunflower Candle",
        description: "Delicate jasmine scent that reminds us of peaceful Ukrainian summers and the family happiness we hold dear.",
        price: "25.99",
        image: "https://pixabay.com/get/g3315577b599c1afabb5cbc6b1c31901c38f5b10e15972b79873f7bc0f6094a341920e3d9b840f784a1637cf8e8a0015173630bc3b98a213e6b7d4dc11e73d631_1280.jpg",
        category: "pillar",
        scent: "Jasmine",
        burnTime: "12-15 hours",
        inStock: true,
        featured: false,
      },
      {
        name: "Lily Sunflower Candle",
        description: "Pure lily fragrance in honor of new beginnings and the hope we carry for baby Ivan's bright future.",
        price: "27.99",
        image: "https://pixabay.com/get/gd905a28a6726c19c49fc1fa3dcb6623871f0b0e18b3b0332a1959c9eea4f1371570859ccb2febe33c4c316078caea6761fed9354efb4af6fd250cf7d5249d695_1280.jpg",
        category: "pillar",
        scent: "Lily",
        burnTime: "12-15 hours",
        inStock: true,
        featured: false,
      },
      {
        name: "Sunflower Gift Set",
        description: "A beautiful collection of our three most popular scented sunflower candles, perfect for gifting and sharing the light of hope.",
        price: "69.99",
        image: "https://pixabay.com/get/g39a0774a2a9525705f05232968015afb82ca45167aceadac68c77a75df847e220685e5ecabcaecde347a7c21b367917957822f1d870a7a9f53b6874e45c1a523_1280.jpg",
        category: "gift-set",
        scent: "Mixed",
        burnTime: "36-45 hours total",
        inStock: true,
        featured: true,
      },
    ];

    initialProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = {
      ...insertUser,
      id,
      stripeCustomerId: null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStripeCustomerId(id: number, stripeCustomerId: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, stripeCustomerId };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async updateOrderPaymentIntent(id: number, stripePaymentIntentId: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    
    const updatedOrder = { ...order, stripePaymentIntentId };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  // Order items operations
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const orderItem: OrderItem = {
      ...insertOrderItem,
      id,
    };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Newsletter operations
  async subscribeToNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = this.newsletterIdCounter++;
    const subscriber: NewsletterSubscriber = {
      ...insertSubscriber,
      id,
      createdAt: new Date(),
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  // Contact operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactIdCounter++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
