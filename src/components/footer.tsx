"use client";

import useCalculateQuantity from "@/hooks/calculateQuantity";
import Link from "next/link";

export function Footer() {
  const { quantity, amount } = useCalculateQuantity();

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);

  const itemText = quantity === 1 ? "ITEM" : "ITEMS";
  const cartTotal = `${formattedAmount} - ${quantity} ${itemText}`;

  return (
    <>
      <footer
        data-footer
        className="fixed bottom-0 left-0 right-0 z-1 flex justify-between bg-background p-[20px] md:p-[30px] font-bold transition-colors duration-2000 ease-in-out"
      >
        <div className="font-bold">
          <Link href="/shop">SHOP</Link>
        </div>
        <div className="font-bold">
          <Link href="/cart">{cartTotal}</Link>
        </div>
      </footer>
    </>
  );
}
