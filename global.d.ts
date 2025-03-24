import { Product } from "@/db/products";

declare global {
  interface Window {
    ElliotWallet: {
      open: () => void;
      close: () => void;
      isOpen: () => boolean;
      handleCartOperation: (operation: CartOperation) => void;
      startCheckout: (callback: CheckoutCallback) => void;
      completeCheckout: (result: CheckoutResult) => void;
    };
  }

  interface CheckoutResult {
    success: boolean;
    hash?: string;
    trackingUrl?: string;
    orderId?: string;
    error?: string;
  }
  

  type CheckoutCallback = (result: CheckoutResult) => void;

  export interface CartItem {
    id?: string;
    image?: string;
    quantity: number;
    title: string;
    price: number;
    weight?: number; // ounces
    willBeShipped: boolean;
    merchantId?: string;
    variantInfo: VariantInfo[];
  }
  
  export interface VariantInfo {
    id: string;
    name: string;
    value: string;
  }
  
  export interface CartOperation {
    item: CartItem;
    type: 'add' | 'increase' | 'decrease' | 'delete';
  }

}

export default global;
