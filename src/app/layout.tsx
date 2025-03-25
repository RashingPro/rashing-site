import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Rashing",
  description: "Rashing | Next.js | Python | Java",
};

const inter = Inter({
    subsets: ["latin", "cyrillic"]
})

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
