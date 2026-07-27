import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PriceRight & QuoteEasy",
  description:
    "Price your work, manage orders from quote to delivery, and track your cash flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        poppins.variable,
      )}
    >
      <body className="flex min-h-screen flex-col bg-background max-w-full text-foreground ">
        <Header />
        {children}
        <Toaster duration={3000} position="top-center" /> {/* Must be mounted here */}
        <Footer />
      </body>
    </html>
  );
}
