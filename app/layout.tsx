import type { Metadata } from "next";
import "./globals.css";

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

export const viewport = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
