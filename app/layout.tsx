import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import AuthProvider from "./_providers/auth";
import { CartProvider } from "./contexts/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cantina CERG",
  description: "Pedidos de lanches!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
