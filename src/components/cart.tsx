"use client";

import { useCart } from "@/providers/cart";
import { CartListItem } from "./cart-list-item";

export const formatPrice = (price: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return formattedAmount;
};

export function Cart() {
  const { cart, clearCart } = useCart();

  const handleCheckoutResult = (result: CheckoutResult) => {
    // console.log('Checkout result:', result);
    
    if (result.success) {
      clearCart();
      // console.log('Success! Hash:', result.hash);
    } else {
      // console.log('Error:', result.error);
    }
  };

  return (
    <div className="pl-[20px] pr-[20px] flex flex-col justify-between max-w-[500px] mx-auto">
      <div className="flex flex-col gap-[20px]">
        <div className="font-bold">CART</div>
        <div className="h-[2px] w-full bg-[#C4C4C4]"></div>
        {cart.items.length == 0 ? (
          <div>EMPTY</div>
        ) : (
          <>
            {cart.items.map((cartItem, index) => {
              if (cartItem.quantity > 0) {
                return (
                  <CartListItem
                    cartItem={cartItem}
                    key={index}
                    isLastItem={index === cart.items.length - 1}
                  />
                );
              }
            })}
          </>
        )}

        {cart.items.length > 0 && (
          <button
            className="w-full bg-[#000000] text-[#C4C4C4] p-[15px] font-bold mt-[20px] hover:bg-[#C4C4C4] hover:text-[#000000] transition-colors duration-200"
            onClick={() => {
              window.ElliotWallet?.startCheckout(handleCheckoutResult);
            }}
          >
            CHECKOUT
          </button>
        )}
      </div>
    </div>
  );
}
