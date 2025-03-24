import { VariantInfo, useCart, Cart, CartItem } from "@/providers/cart";

interface UpdateCartArgs {
  cartItem: CartItem;
  direction: 'increase' | 'decrease' | 'delete';
}

export const compareVariants = (var1: VariantInfo[], var2: VariantInfo[]) => {
  return (
    var1.every(({ name, value }) =>
      var2.some(
        ({ name: name2, value: value2 }) => name2 === name && value2 === value
      )
    ) &&
    var2.every(({ name, value }) =>
      var1.some(
        ({ name: name2, value: value2 }) => name2 === name && value2 === value
      )
    )
  );
};

const useUpdateCart = () => {
  const { cart, setCart } = useCart();
  const MAX_QUANTITY = 5;

  const updateCart = ({ cartItem, direction }: UpdateCartArgs) => {
    try {
      const existingItemIndex = cart.items.findIndex(
        ({ id, variantInfo }) =>
          id === cartItem.id && compareVariants(variantInfo, cartItem.variantInfo)
      );

      if (existingItemIndex === -1) return;

      const existingItem = cart.items[existingItemIndex];
      const { price, weight } = existingItem;
      
      if (direction === 'delete') {
        const updatedItems = [...cart.items];
        updatedItems.splice(existingItemIndex, 1);
        
        setCart({
          totalPrice: cart.totalPrice - (price * existingItem.quantity),
          totalWeight: cart.totalWeight - (weight * existingItem.quantity),
          currency: cart.currency,
          items: updatedItems
        });
        
        return;
      }
      
      let newQuantity = direction === 'decrease' 
        ? existingItem.quantity - 1 
        : Math.min(existingItem.quantity + 1, MAX_QUANTITY);
      
      if (direction === 'decrease' && newQuantity === 0) {
        const updatedItems = [...cart.items];
        updatedItems.splice(existingItemIndex, 1);
        
        setCart({
          totalPrice: cart.totalPrice - (price * existingItem.quantity),
          totalWeight: cart.totalWeight - (weight * existingItem.quantity),
          currency: cart.currency,
          items: updatedItems
        });
        
        return;
      }
      
      if (direction === 'increase' && existingItem.quantity >= MAX_QUANTITY) {
        return;
      }
      
      const updatedItems = [...cart.items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity
      };
      
      const priceDifference = direction === 'increase' ? price : -price;
      const weightDifference = direction === 'increase' ? weight : -weight;
      
      setCart({
        totalPrice: cart.totalPrice + priceDifference,
        totalWeight: cart.totalWeight + weightDifference,
        currency: cart.currency,
        items: updatedItems
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return updateCart;
};

export default useUpdateCart;