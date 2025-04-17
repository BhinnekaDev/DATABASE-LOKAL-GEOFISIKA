import "@/app/globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

// Konfigurasi font Lexend untuk digunakan dalam aplikasi
const lexend = Lexend({
    variable: "--font-lexend", // Menyimpan font Lexend dalam variabel CSS
    subsets: ["latin"], // Menggunakan subset Latin untuk font ini
});

// Metadata untuk halaman, ini akan digunakan untuk SEO dan informasi lainnya
export const metadata: Metadata = {
    title: "Database Lokal Geofisika",
    description: "Database Lokal Geofisika Bengkulu",
};

// Layout root utama yang membungkus seluruh halaman aplikasi
export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* Menggunakan font Lexend dan mengaktifkan anti-aliasing pada teks */}
            <body
                className={`${lexend.variable} antialiased`} // Menambahkan kelas CSS untuk font dan anti-aliasing
                cz-shortcut-listen="true" // Atribut ini kemungkinan terkait dengan fitur shortcut aksesibilitas
            >
                {children}{" "}
                {/* Menampilkan semua konten yang diteruskan sebagai children */}
            </body>
        </html>
    );
}
