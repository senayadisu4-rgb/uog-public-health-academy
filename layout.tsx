import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UoG Public Health Academy | Learn · Practice · Serve",
  description: "A responsive student learning portal for Health Officer students: courses, resources, exam practice and community.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
