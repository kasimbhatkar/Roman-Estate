import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roman Estate | Luxury Properties",
  description: "Premium real estate consulting and property management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <StoreProvider>{children}</StoreProvider>
        <script
          src="https://revochat.io/api/chatbot/widget?id=6a33d61873f80d672dc37b9b"
          defer
        ></script>
      </body>
    </html>
  );
}
