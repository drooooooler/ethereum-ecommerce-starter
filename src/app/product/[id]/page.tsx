import Image from "next/image";
import products from "../../../db/products";
import { notFound } from "next/navigation";
import { ProductItem } from "@/components/product-item";

async function getProduct(id: string) {
  const product = products.filter((product) => product.id == id);
  if (!product) notFound();
  return product[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product.title,
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <ProductItem product={product}/>
  );
}
