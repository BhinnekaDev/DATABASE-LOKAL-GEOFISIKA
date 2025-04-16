import { ReactNode } from "react";
import { useMedia } from "react-use";
import backgroundLight from "@/public/Background-Light.jpg";
import backgroundDark from "@/public/Background-Dark.jpg";

// Komponen BackgroundLogin menerima children sebagai prop
export default function BackgroundLogin({ children }: { children: ReactNode }) {
    // Menggunakan hook useMedia untuk mendeteksi apakah preferensi mode gelap (dark mode) diaktifkan
    const isDarkMode = useMedia("(prefers-color-scheme: dark)");

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
            style={{
                // Menentukan gambar latar sesuai dengan mode yang digunakan (dark mode atau light mode)
                backgroundImage: `url(${
                    isDarkMode ? backgroundDark.src : backgroundLight.src
                })`,
            }}
        >
            {children} {/* Menampilkan children di dalam div */}
        </div>
    );
}
