import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Secure the Future | Raising Awareness About Drug Abuse & Addiction",
  description: "Secure the Future is dedicated to raising awareness about drug abuse and addiction, providing support resources, sharing survivor stories, and building a community of hope and recovery.",
  keywords: ["drug abuse", "addiction awareness", "recovery", "mental health", "substance abuse", "support", "prevention"],
  authors: [{ name: "Secure the Future" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://securethefuture.org",
    siteName: "Secure the Future",
    title: "Secure the Future | Raising Awareness About Drug Abuse & Addiction",
    description: "Join us in raising awareness about drug abuse and addiction. Find support, resources, and stories of hope.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Secure the Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure the Future | Raising Awareness About Drug Abuse & Addiction",
    description: "Join us in raising awareness about drug abuse and addiction. Find support, resources, and stories of hope.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
