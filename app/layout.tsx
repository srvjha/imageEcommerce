import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pictron",
  description: "Image Selling Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased  bg-black/50 bg-blend-overlay roboto-mono-manual
          bg-[url("https://w0.peakpx.com/wallpaper/548/952/HD-wallpaper-old-newspaper-macro-old-paper-texture-paper-backgrounds-paper-textures-retro-backgrounds-old-paper-brown-paper-brown-paper-background.jpg")]`}
      >
        <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"        
        />
        <Providers>
          <Header/>
        <main>{children}</main>
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
