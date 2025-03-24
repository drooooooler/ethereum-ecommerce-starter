import Image from "next/image";
import { Product as ProductInterface } from "../db/products";
import Link from "next/link";

interface ProductProps {
  product: ProductInterface;
}

export function ProductListItem({ product }: ProductProps) {
  return (
    <Link
      className="flex flex-col gap-[10px] text-start"
      href={`/product/${product.id}`}
    >
      <Image
        priority
        src={product.image}
        alt={product.title}
        width={380}
        height={380}
      />
      <div className="font-bold">{product.title.toUpperCase()}</div>
    </Link>
  );
}
