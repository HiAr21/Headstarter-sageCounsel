'use client';
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>  
      </body>
    </html>
  );
}
