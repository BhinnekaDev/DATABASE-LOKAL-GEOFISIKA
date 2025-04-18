import React from "react";
import { useMedia } from "react-use";
import { FaInstagram, FaGlobe } from "react-icons/fa";

// Komponen Footer yang menampilkan informasi hak cipta dan pesan
export default function Footer() {
    // Mengambil preferensi dark mode dari sistem pengguna
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    return (
        // Elemen footer dengan kelas untuk styling yang lebih menarik
        <footer
            className={`w-full mt-8 py-6 px-10 text-sm border-t rounded-t-xl ${
                isDarkMode
                    ? "bg-[#18171F] text-[#f5f5f7] border-[#444]"
                    : "bg-[#f5f5f7] text-[#18171F] border-[#ddd]"
            }`}
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Menampilkan tahun dan pesan hak cipta */}
                <span className="font-semibold text-center">
                    &copy; {new Date().getFullYear()} Bhinneka Dev – Berkarya
                    untuk Indonesia yang lebih baik.
                </span>

                {/* Ikon media sosial */}
                <div className="flex gap-6 mt-4 md:mt-0">
                    {/* Ikon Instagram */}
                    <a
                        href="https://instagram.com/bhinnekaDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-pink-600 transition duration-300"
                    >
                        <FaInstagram />
                    </a>
                    {/* Ikon website */}
                    <a
                        href="https://bhinneka-dev.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-blue-700 transition duration-300"
                    >
                        <FaGlobe />
                    </a>
                </div>
            </div>
        </footer>
    );
}
