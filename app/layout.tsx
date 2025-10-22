import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Web3Provider } from "@/providers/Web3Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SphereCo",
  description:
    "Create and manage influencer marketing campaigns with AI-powered insights and Web3 integration",
  icons: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Web3Provider>
          <Navigation />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
