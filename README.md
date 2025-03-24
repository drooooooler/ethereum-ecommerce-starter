# Ethereum E-commerce Starter Kit

Buy and sell physical goods on-chain using React, Typescript, and Next.js and Tailwind.

![banner image](/public/og-image.jpg)

## Features

- ⚡ Next.js 15 and Vercel for build / deployment
- 🎨 TailwindCSS / shadcn for styling
- 📱 Responsive design out of the box
- 💎 TypeScript 
- 🔑 Simple script-based integration with Elliot Wallet

## Prerequisites

- Node.js (v18 or higher)
- A modern web browser
- Elliot Wallet credentials:
  1. Visit [justelliotme.com](https://www.justelliotme.com)
  2. Either create a new account or import your existing Web3 wallet
  3. Click your balance amount in the top right corner
  4. Select "Developer" to find your:
     - Merchant ID (used to identify your store)
     - API Key (used for analytics tracking)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/justelliot/ethereum-ecommerce-starter.git

cd ethereum-ecommerce-starter
```

2. Install dependencies:
```bash
npm install
```

3. Add your Merchant ID and API key to the script tag in the layout.tsx file:
```html
<script 
  src="https://wallet-script.vercel.app/bundle.js"
  data-merchant-id="your_merchant_id"
  data-api-key="your_api_key">
</script>
```
Note: The API key is only used for analytics and tracking purposes to identify who is using the script. It is not used for any sensitive operations.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
ethereum-ecommerce-starter/
├── src/              
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable UI components
│   ├── lib/        # Utility functions and helpers
│   └── db/         # Database configuration and schemas
│       ├── schema/ # Database schema definitions
│       │   └── products.ts  # Product schema and types
│       └── data/   # JSON data files for products
│           └── products.json # Your product catalog
├── public/         # Static files (images, etc.)
├── .next/         # Next.js build output
├── components.json # UI components configuration
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json  # TypeScript configuration
```

To update your product catalog, modify the `src/db/data/products.json` file. Each product should follow this structure:
```json
{
  "id": "unique_product_id",             # Unique identifier for the product
  "title": "Product Name",               # Display name of the product
  "description": "Detailed product description",
  "price": 1500,                         # Price in cents (1500 = $15.00)
  "image": "/images/product-image.jpg",  # Path to product image
  "weight": 36,                          # Weight in ounces
  "sku": "ELT-20205-001",                # Stock keeping unit 
  "willBeShipped": true,                 # Whether the product requires shipping
  "merchantId": "your_merchant_id",      # Your Elliot merchant ID
  "variantInfo": [                       # Product variants (optional)
    {
      "label": "Size",                         # Variant type
      "options": ["S", "M", "L", "XL", "2XL"]  # Available options
    },
    {
      "label": "Color",
      "options": ["Red", "Blue", "Green"]
    }
  ],
}
```

Important notes about the product structure:
- `price` is in cents (USD) to avoid floating-point precision issues. For example:
  - $15.00 = 1500
  - $9.99 = 999
  - $100.00 = 10000
- `image` can be a local path in your `public` directory or an external URL
- `variantInfo` is optional and can include multiple variant types (size, color, etc.)
- `weight` is in ounces and is required if `willBeShipped` is true
- `merchantId` must match the ID provided in your script tag

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Elliot Wallet Script](https://justelliotme.com)

## Deployment

The application can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel (Note: No .env required for this to work!)
3. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/drooooooler/ethereum-ecommerce-starter)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue in the repository.