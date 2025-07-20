import "@/assets/css/index.css";
import { Toaster } from "@/components/ui/sonner";
import "@/env";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "URL Shortener App",
  description: "Transform long URLs into short, shareable links",
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="min-h-screen flex p-4 bg-gradient-to-br from-blue-50 to-indigo-100 justify-center items-center">
          {children}
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
};

export default Layout;
