import { useState, useEffect } from 'react';
import { useCart } from '@/providers/cart';

type CartTotals = {
  quantity: number;
  amount: number;
};

const useCalculateQuantity = (): CartTotals => {
  const [cartTotals, setCartTotals] = useState<CartTotals>({ quantity: 0, amount: 0 });
  const { cart } = useCart();

  const dep = JSON.stringify(cart);

  useEffect(() => {
    const resp = cart.items.reduce(
      (acc, cur) => {
        acc.quantity += cur.quantity;
        acc.amount += cur.price * cur.quantity; 
        return acc;
      },
      { quantity: 0, amount: 0 }
    );

    setCartTotals(resp);
  }, [dep]);

  return cartTotals;
};

export default useCalculateQuantity;