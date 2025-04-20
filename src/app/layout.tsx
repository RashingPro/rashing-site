import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Rashing",
    description: "Rashing | Next.js | React | Python | Java",
    openGraph: {
        url: ""
    },
    twitter: {
        card: "summary"
    }
};

const font = Roboto_Mono({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600"]
})

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="ru">
            <body className={`${font.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
