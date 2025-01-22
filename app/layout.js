import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Manager - System to Manage Stocks | Manage your Stock seamlessly !",
  description: "Generated with love by Vinayak Gore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={inter.className}><ToastContainer />{children}</body>
    </html>
  );
}
