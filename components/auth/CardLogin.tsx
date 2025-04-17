import { useMedia } from "react-use";
import React, { ReactNode, useEffect, useState } from "react";

// Komponen CardLogin dengan dua kolom isi
export default function CardLogin({ children }: { children: ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false); // State untuk mengecek apakah komponen sudah dimounting
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Mengecek apakah mode gelap aktif

    // Tunggu sampai komponen dimount
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Jangan render apapun sebelum dimount
    if (!hasMounted) return null;

    return (
        <div
            className={`rounded-xl shadow-lg w-full px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 ${
                isDarkMode ? "bg-[#18171F]" : "bg-[#f5f5f7]"
            }`}
        >
            {/* Render semua elemen anak */}
            {children}
        </div>
    );
}
