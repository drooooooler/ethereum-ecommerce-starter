import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/header";
import type React from "react";
import { Footer } from "../components/footer";
import CartProvider from "@/providers/cart";

export const metadata: Metadata = {
  title: "Elliot Commerce",
  description: "A modern web3 ecommerce experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="mt-[61px] md:mt-[84px] mb-[61px] md:mb-[84px] h-full w-full">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <script
          src="https://wallet-script.vercel.app/bundle.js"
          type="text/javascript"
          data-merchant-id="your_merchant_id"
          data-api-key="your_api_key"
        ></script>
      </body>
    </html>
  );
}
