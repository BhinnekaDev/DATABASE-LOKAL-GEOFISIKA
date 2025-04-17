import { useMedia } from "react-use";
import backgroundDark from "@/public/Background-Dark.jpg";
import backgroundLight from "@/public/Background-Light.jpg";
import React, { ReactNode, useEffect, useState } from "react";

// Komponen untuk menampilkan background login
export default function BackgroundLogin({ children }: { children: ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false); // State untuk mengecek apakah komponen sudah dimounting
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Mengecek apakah mode gelap aktif

    // Tandai bahwa komponen sudah dimounting
    useEffect(() => {
        setHasMounted(true);
    }, []);

    // Pilih gambar latar berdasarkan mode gelap/terang
    const backgroundImage = hasMounted
        ? isDarkMode
            ? backgroundDark.src // Menggunakan background gelap jika mode gelap aktif
            : backgroundLight.src // Menggunakan background terang jika mode terang aktif
        : backgroundLight.src; // Default ke background terang jika belum dimounting

    return (
        <div className="w-full h-full min-h-screen relative flex justify-center items-center overflow-hidden">
            {/* Latar belakang dengan efek blur */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`, // Menetapkan gambar latar belakang
                }}
            />
            {/* Konten utama */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
