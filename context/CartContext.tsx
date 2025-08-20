
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CartItem, OrderDetails, PaymentMethod } from '../types';

interface CartContextType {
  items: CartItem[];
  orderDetails: OrderDetails;
  addItem: (itemToAdd: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setOrderDetails: (details: OrderDetails) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getInitialState = <T,>(key: string, defaultValue: T): T => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return defaultValue;
            }
        }
    }
    return defaultValue;
};


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => getInitialState('cartItems', []));
  const [orderDetails, setOrderDetailsState] = useState<OrderDetails>(() => getInitialState('orderDetails', {
    customerName: '',
    paymentMethod: PaymentMethod.PIX,
  }));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    const newTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [items]);

  useEffect(() => {
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  }, [orderDetails]);

  const addItem = (itemToAdd: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        );
      }
      return [...prevItems, itemToAdd];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setOrderDetailsState({ customerName: '', paymentMethod: PaymentMethod.PIX });
  };

  const setOrderDetails = (details: OrderDetails) => {
    setOrderDetailsState(details);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, orderDetails, setOrderDetails }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
