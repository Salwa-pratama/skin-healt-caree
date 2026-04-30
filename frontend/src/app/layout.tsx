import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Using Manrope for the landing page
import { ReactQueryProvider } from "@/lib/react-query-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


export const metadata: Metadata = {
  title: "DermaScan - Precise AI Skin Health",
  description: "Next-generation medical AI for precision skin health analysis and monitoring.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${manrope.variable} antialiased`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

