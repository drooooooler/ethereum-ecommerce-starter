import { ProductListItem } from "@/components/product-list-item";
import products from "@/db/products";

export default function Home() {
  return (
    <div className="container mx-auto px-[20px]">
      <div className="flex flex-wrap gap-5 justify-center">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

