import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { CartProvider } from "./contexts/cart";
import Header from "./_components/header";
import AuthProvider from "./_providers/auth";

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
        </AuthProvider>
      </body>
    </html>
  );
}
