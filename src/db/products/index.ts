export interface Variant {
  label: string;
  options: string[];
}

export interface Product {
  description: string;
  id: string;
  image: string;
  title: string;
  price: number;
  weight: number; // ounces
  sku: string;
  variantInfo?: Variant[];
  willBeShipped: boolean;
  merchantId: string;
}

const products: Product[] = [
  {
    description:
      "She's going to steal it bro, order 2.",
    id: "1",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/hoodie.jpg",
    title: "Elliot Logo Hoodie",
    price: 15000, // $150
    weight: 16, // ounces
    sku: "ELT-2025-001",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [
      {
        "label": "Size",
        "options": ["S", "M", "L", "XL", "2XL"]
      }
    ]
  },
  {
    description: "Went Nike and just did it.",
    id: "2",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/shirt.jpg",
    title: "\"Just Vaporware\" T-Shirt",
    price: 5000, // $50
    weight: 6, // ounces
    sku: "ELT-2025-002",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [
      {
        label: "Size",
        options: ["S", "M", "L", "XL", "2XL"]
      }
    ]
  },
  {
    description: "Every thing and a bag of chips.",
    id: "3",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/party-pack.jpg",
    title: "Party Pack",
    price: 50000, // $500
    weight: 36, // ounces
    sku: "ELT-20205-003",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [
      {
        label: "Size",
        options: ["S", "M", "L", "XL", "2XL"],
      },
    ],
  },
  {
    description: "When in Rome.",
    id: "4",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/lighter.jpg",
    title: "Clipper Lighter",
    price: 2500, // $25
    weight: 10, // ounces
    sku: "ELT-2025-004",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [],
  },
  {
    description: "No Plan B with a Plan A.",
    id: "5",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/condom.jpg",
    title: "Condom",
    price: 1000, // $10
    weight: 1, // ounces
    sku: "ELT-2025-005",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [],
  },
  {
    description: "Puff, puff, pass mo'fck'a.",
    id: "6",
    image: "https://storage.googleapis.com/justelliotme-demo-store/products/paper.jpg",
    title: "Rolling Papers (1 Pack)",
    price: 1000, // $10
    weight: 3, // ounces
    sku: "ELT-2025-006",
    willBeShipped: true,
    merchantId: "Hq57AIcfsRT81jEyrLPz",
    variantInfo: [],
  },
];

export default products;

