import "@/app/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Database Lokal Geofisika",
    description: "Database Lokal Geofisika Bengkulu",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${lexend.variable} antialiased`}>{children}</body>
        </html>
    );
}
