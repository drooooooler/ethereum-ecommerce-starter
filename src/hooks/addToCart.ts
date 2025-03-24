import { Product } from "../db/products";
import { VariantInfo, useCart, Cart, CartItem } from "@/providers/cart";

interface AddToCartArgs {
  product: Product;
  variantInfo: VariantInfo[];
  quantity: number;
}

export const compareVariants = (var1: VariantInfo[], var2: VariantInfo[]) => {
  if (var1.length !== var2.length) {
    return false;
  }

  const createVariantHash = (variantInfo: VariantInfo[]) => {
    const sorted = [...variantInfo].sort((a, b) => {
      const nameCompare = a.name.localeCompare(b.name);
      return nameCompare !== 0 ? nameCompare : a.value.localeCompare(b.value);
    });

    return sorted.map((v) => `${v.name}:${v.value}`).join("|");
  };

  return createVariantHash(var1) === createVariantHash(var2);
};

const useAddToCart = () => {
  const { cart, setCart } = useCart();

  const addToCart = ({
    product,
    variantInfo: newVariantInfo,
    quantity,
  }: AddToCartArgs) => {
    try {
      const footer = document.querySelector("[data-footer]");
      if (footer) {
        footer.classList.add("animate-color-cycle");
        setTimeout(() => {
          footer.classList.remove("animate-color-cycle");
        }, 2000);
      }
     
      const existingCartItemIndex = cart.items.findIndex(
        ({ id, variantInfo }) => {
          const match =
            id === product.id && compareVariants(variantInfo, newVariantInfo);
         
          return match;
        }
      );

      const { price, weight } = product;
      let tempCart: Cart = structuredClone(cart); 

      if (existingCartItemIndex !== -1) {
        const existingCartItem = cart.items[existingCartItemIndex];
        const newQuantity = existingCartItem.quantity + quantity;

        const updatedItems = structuredClone(cart.items);
        updatedItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: newQuantity,
        };

        tempCart = {
          totalPrice:
            cart.totalPrice -
            price * existingCartItem.quantity +
            price * newQuantity,
          totalWeight:
            cart.totalWeight -
            weight * existingCartItem.quantity +
            weight * newQuantity,
          currency: "USD",
          items: updatedItems,
        };
      } else {
        const cartItem: CartItem = {
          id: product.id,
          image: product.image,
          quantity: quantity,
          title: product.title,
          price: product.price,
          weight: product.weight,
          variantInfo: structuredClone(newVariantInfo), 
          sku: product.sku,
          willBeShipped: product.willBeShipped,
          merchantId: product.merchantId,
        };

        tempCart = {
          totalPrice: cart.totalPrice + quantity * price,
          totalWeight: cart.totalWeight + quantity * weight,
          currency: "USD",
          items: [...cart.items, cartItem],
        };
      }

      setCart(tempCart);
    } catch (error) {
      // console.error("Error adding to cart:", error);
    }
  };

  return addToCart;
};

export default useAddToCart;
