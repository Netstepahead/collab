import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Network CRM",
  description: "Understand your networking style and manage your relationships strategically",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
