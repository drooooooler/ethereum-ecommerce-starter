"use client";

import Image from "next/image";
import { CartItem } from "@/providers/cart";
import { Minus } from "./icons/minus";
import { Plus } from "./icons/plus";
import useUpdateCart from "@/hooks/updateCart";

export const formatPrice = (price: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return formattedAmount;
};

interface CartListItemProps {
  cartItem: CartItem;
  isLastItem: boolean;
}

export function CartListItem({ cartItem, isLastItem }: CartListItemProps) {
  const updateCart = useUpdateCart();
  const displayPrice = formatPrice(cartItem.quantity * cartItem.price);
  const quantityLabel =
    cartItem.quantity > 1 ? ` (${formatPrice(cartItem.price)} each)` : "";

  return (
    <div>
      <div className="flex flex-row justify-between align-top">
        <div className="h-[75px] w-[75px]">
          <Image
            priority
            src={cartItem.image}
            alt={cartItem.title}
            height={75}
            width={75}
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>

        <div className="text-right">
          <div className="font-bold uppercase text-[14px]">
            {`${cartItem.title}`}
          </div>
          <span className="uppercase">
            {displayPrice}
            {quantityLabel}
          </span>
          {cartItem.variantInfo.length > 0 && (
            <>
              <div className="flex flex-row justify-end">
                <Minus />
              </div>
              {cartItem.variantInfo?.map((variant) => (
                <div key={variant.id}>
                  <div className="font-bold">
                    {variant.name}: {variant.value}
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="flex flex-row items-center justify-end text-[14px]">
            <button
              onClick={() => {
                updateCart({ cartItem, direction: "decrease" });
                window.ElliotWallet.handleCartOperation({
                  item: {
                    id: cartItem.id,
                    quantity: cartItem.quantity,
                    title: cartItem.title,
                    price: cartItem.price,
                    image: cartItem.image,
                    variantInfo: cartItem.variantInfo,
                    willBeShipped: true,
                    weight: cartItem.weight,
                    merchantId: cartItem.merchantId,
                  },
                  type: "decrease",
                });
              }}
            >
              <Minus />
            </button>
            <span className="pl-[10px] pr-[10px]">{cartItem.quantity}</span>
            <button
              onClick={() => {
                updateCart({ cartItem, direction: "increase" });
                window.ElliotWallet.handleCartOperation({
                  item: {
                    id: cartItem.id,
                    quantity: cartItem.quantity,
                    title: cartItem.title,
                    price: cartItem.price,
                    image: cartItem.image,
                    variantInfo: cartItem.variantInfo,
                    willBeShipped: true,
                    weight: cartItem.weight,
                    merchantId: cartItem.merchantId,
                  },
                  type: "increase",
                });
              }}
            >
              <Plus />
            </button>
          </div>
          <button
            className="underline text-[14px]"
            onClick={() => {
              updateCart({ cartItem: cartItem, direction: "delete" });
              window.ElliotWallet.handleCartOperation({
                item: {
                  id: cartItem.id,
                  quantity: cartItem.quantity,
                  title: cartItem.title,
                  price: cartItem.price,
                  image: cartItem.image,
                  variantInfo: cartItem.variantInfo,
                  willBeShipped: true,
                  weight: cartItem.weight,
                  merchantId: cartItem.merchantId,
                },
                type: "delete",
              });
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {!isLastItem && (
        <div className="h-[2px] w-full bg-[#C4C4C4] mt-[20px]"></div>
      )}
    </div>
  );
}
