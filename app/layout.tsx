import "@/app/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

// Konfigurasi font Lexend
const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

// Metadata untuk halaman
export const metadata: Metadata = {
    title: "Database Lokal Geofisika",
    description: "Database Lokal Geofisika Bengkulu",
};

// Layout root utama
export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* Gunakan font Lexend dan anti-aliasing */}
            <body className={`${lexend.variable} antialiased`}>{children}</body>
        </html>
    );
}
