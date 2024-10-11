import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stock Management System - Manage your Stock seamlessly !",
  description: "Generated with love by Coding ViNU",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-[#cdcdcd]">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
