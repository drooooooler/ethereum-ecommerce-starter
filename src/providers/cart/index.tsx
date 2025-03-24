"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface VariantInfo {
  id: string;
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  image: string;
  quantity: number;
  title: string;
  price: number;
  weight: number;
  variantInfo: VariantInfo[];
  sku: string;
  willBeShipped: boolean;
  merchantId: string;
}

export interface Cart {
  totalPrice: number;
  totalWeight: number;
  currency: string;
  items: CartItem[];
}

export const initialCart: Cart = {
  totalPrice: 0,
  totalWeight: 0,
  currency: "USD",
  items: [],
};

const CartContext = createContext({
  cart: initialCart,
  setCart: (cart: Cart) => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<Cart>(initialCart);

  const handleSetCart = (cart: Cart) => {
    localStorage.setItem("elliotCart", JSON.stringify(cart));
    setCart(cart);
  };

  const clearCart = () => {
    localStorage.removeItem("elliotCart");
    setCart(initialCart);
  };

  useEffect(() => {
    const persistedCart = localStorage.getItem("elliotCart");

    if (persistedCart) {
      setCart(JSON.parse(persistedCart));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart: handleSetCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
