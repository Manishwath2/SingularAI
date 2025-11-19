import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SingulynAI - Cognitive Super-App",
  description: "A futuristic, offline-capable, multi-tenant chat platform with autonomous agent capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
