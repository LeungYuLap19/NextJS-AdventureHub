import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-inter' 
});
const ubuntu = Ubuntu({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'], 
  variable: '--font-ubuntu' 
});

export const metadata: Metadata = {
  title: "AdventureHub",
  description: "AdventureHub is your ultimate travel companion. Discover exciting cities and countries, plan your trips seamlessly, and compare flights and hotels from different websites to get the best deals.",
  icons: {
    icon: '/icons/logo.png'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ubuntu.variable}`}>{children}</body>
    </html>
  );
}
