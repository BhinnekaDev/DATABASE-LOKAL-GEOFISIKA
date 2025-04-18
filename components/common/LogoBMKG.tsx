import React from "react";
import Image from "next/image";
import LogoBmkg from "@/public/Logo-BMKG.png";

// Komponen untuk menampilkan logo BMKG
export default function LogoBMKG() {
    return (
        <div className="p-3 w-fit">
            {/* Membungkus logo dengan padding dan lebar sesuai konten */}
            {/* Menampilkan gambar logo dengan ukuran 12x12 dan prioritas load */}
            <Image
                src={LogoBmkg}
                alt="Logo BMKG"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
                priority
            />
        </div>
    );
}
