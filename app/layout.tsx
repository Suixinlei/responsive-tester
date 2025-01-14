import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "responsive tester - Check your page in every UA or device 🖥 💻 📱",
  description: "Check your page in every UA or device 🖥 💻 📱",
  metadataBase: new URL("https://responsive.kouka.tech"),
  openGraph: {
    title: "responsive tester",
    description: "Check your page in every UA or device 🖥 💻 📱",
    siteName: "responsive tester",
    type: "website",
    images: [
      {
        url: "/assets/banner.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
