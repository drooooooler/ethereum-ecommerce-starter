"use client";

import Image from "next/image";
import { Product as ProductInterface } from "../db/products";
import useAddToCart from "@/hooks/addToCart";
import { VariantInfo } from "@/providers/cart";
import { ChevronDown } from "./icons/chevron-down";
import { useState } from "react";

interface ProductProps {
  product: ProductInterface;
}

export const formatPrice = (price: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);

  return formattedAmount;
};

export function ProductItem({ product }: ProductProps) {
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [variantValues, setVariantValues] = useState<VariantInfo[]>(
    product.variantInfo?.map(({ label, options }, index) => ({
      id: index.toString(),
      name: label,
      value: options[0], 
    })) || []
  );

  return (
    <div className="pl-[20px] pr-[20px] flex flex-col justify-between max-w-[500px] mx-auto">
      <div>
        <Image
          priority
          src={product.image}
          alt={product.title}
          width={380}
          height={380}
          sizes="(max-width: 768px) 180vw, 50vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <div className="mt-4">
          <div className="text-[24px] font-bold">
            {product.title.toUpperCase()}
          </div>
          <div className="text-[16px] font-bold">
            {formatPrice(product.price)}
          </div>
        </div>
        <div className="my-4">
          <p className="text-[16px]">{product.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-[20px]">
        {product.variantInfo?.map(({ label, options }, index) => (
          <div className="relative" key={label}>
            <div className="flex items-center justify-between border-b-[2px] border-[#C4C4C4] py-2">
              <span className="text-[14px] font-bold">
                {label.toUpperCase()}
              </span>
              <div className="flex items-center gap-3">
                <select
                  key={`${label}-${index}`}
                  className="appearance-none bg-transparent focus:outline-none align-items text-[14px] w-auto [text-align-last:right]"
                  onChange={(e) => {
                    const newVariantValues = [...variantValues];
                    const index = variantValues?.findIndex(
                      ({ name }) => name === label
                    );

                    if (index === -1) {
                      newVariantValues.push({
                        id: variantValues.length.toString(), 
                        name: label,
                        value: e.target.value,
                      });
                    } else {
                      newVariantValues[index].value = e.target.value;
                    }

                    setVariantValues(newVariantValues);
                  }}
                  value={
                    variantValues.find(({ name }) => name === label)?.value
                  }
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>
          </div>
        ))}

        <div className="relative">
          <div className="flex items-center justify-between border-b-[2px] border-[#C4C4C4] py-2">
            <span className="text-[14px] font-bold">QTY</span>
            <div className="flex items-center gap-3">
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="appearance-none bg-transparent w-auto focus:outline-none [text-align-last:end] text-[14px]"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <ChevronDown />
            </div>
          </div>
        </div>

        <button
          className="w-full bg-[#C4C4C4] p-[15px] font-bold text-black hover:bg-black hover:text-[#C4C4C4] transition-colors duration-200"
          onClick={() => {
            addToCart({
              product,
              variantInfo: variantValues,
              quantity,
            });
            window.ElliotWallet.handleCartOperation({
              item: {
                id: product.id,
                quantity: quantity,
                title: product.title,
                price: product.price,
                image: product.image,
                variantInfo: variantValues,
                willBeShipped: true,
                weight: product.weight,
                merchantId: product.merchantId,
              },
              type: "add",
            });
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
