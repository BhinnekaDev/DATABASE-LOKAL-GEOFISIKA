"use client";
import { useMedia } from "react-use";
import React, { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

// Komponen layout utama untuk halaman dashboard
export default function LayoutDashboard({ children }: { children: ReactNode }) {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan mode gelap atau terang

    return (
        // Wrapper layout utama dengan font Lexend dan minimum tinggi layar penuh
        <section
            className={`font-[family-name:var(--font-lexend)] flex min-h-screen ${
                isDarkMode ? "bg-[#18171F]" : "bg-[#f5f5f7]"
            }`}
        >
            {/* Sidebar yang berada di sisi kiri */}
            <Sidebar />

            {/* Kontainer utama di sebelah kanan sidebar */}
            <div className="flex-1 flex flex-col">
                {/* Navbar di bagian atas */}
                <Navbar />

                {/* Area utama konten halaman */}
                <main className="p-4">
                    {children} {/* Isi halaman akan dirender di sini */}
                </main>
            </div>
        </section>
    );
}
