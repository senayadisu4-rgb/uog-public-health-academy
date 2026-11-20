import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UoG Public Health Academy",
  description: "University of Gondar Public Health student learning community"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
