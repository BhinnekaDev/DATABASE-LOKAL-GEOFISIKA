import React, { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

// Komponen layout utama untuk halaman dashboard
export default function LayoutDashboard({ children }: { children: ReactNode }) {
    return (
        // Wrapper layout utama dengan font Lexend dan minimum tinggi layar penuh
        <section className="font-[family-name:var(--font-lexend)] bg-white flex min-h-screen">
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
