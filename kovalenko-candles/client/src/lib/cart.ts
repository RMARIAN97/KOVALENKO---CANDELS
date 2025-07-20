import { useState, useEffect } from 'react';
import type { Product } from '@shared/schema';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// Simple cart state management
let cartState: CartStore = {
  items: [],
  isOpen: false,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
};

const listeners = new Set<() => void>();

function updateCart(updater: (state: CartStore) => Partial<CartStore>) {
  const updates = updater(cartState);
  cartState = { ...cartState, ...updates };
  
  // Save to localStorage
  localStorage.setItem('kovalenko-cart', JSON.stringify({
    items: cartState.items,
    isOpen: cartState.isOpen,
  }));
  
  // Notify listeners
  listeners.forEach(listener => listener());
}

// Load from localStorage on startup
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('kovalenko-cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      cartState.items = parsed.items || [];
      cartState.isOpen = parsed.isOpen || false;
    }
  } catch (e) {
    // Ignore errors
  }
}

// Initialize cart methods
cartState.addItem = (product: Product, quantity = 1) => {
  updateCart((state) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      };
    } else {
      return {
        items: [...state.items, { product, quantity }],
      };
    }
  });
};

cartState.removeItem = (productId: number) => {
  updateCart((state) => ({
    items: state.items.filter(item => item.product.id !== productId),
  }));
};

cartState.updateQuantity = (productId: number, quantity: number) => {
  if (quantity <= 0) {
    cartState.removeItem(productId);
    return;
  }
  
  updateCart((state) => ({
    items: state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ),
  }));
};

cartState.clearCart = () => {
  updateCart(() => ({ items: [] }));
};

cartState.openCart = () => {
  updateCart(() => ({ isOpen: true }));
};

cartState.closeCart = () => {
  updateCart(() => ({ isOpen: false }));
};

cartState.toggleCart = () => {
  updateCart((state) => ({ isOpen: !state.isOpen }));
};

cartState.getTotalItems = () => {
  return cartState.items.reduce((total, item) => total + item.quantity, 0);
};

cartState.getTotalPrice = () => {
  return cartState.items.reduce((total, item) => 
    total + (parseFloat(item.product.price) * item.quantity), 0
  );
};

export function useCart(): CartStore {
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    
    return () => {
      listeners.delete(listener);
    };
  }, []);
  
  return cartState;
}
