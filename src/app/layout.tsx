import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SingularAI - Private Chat Application",
  description: "A secure and private chat application for two people",
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
