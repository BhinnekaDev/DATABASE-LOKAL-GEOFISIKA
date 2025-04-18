import React from "react";
import { useMedia } from "react-use";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";

// Komponen untuk menampilkan item sidebar dengan label, ikon, dan status aktif/collapse
export default function SubSidebarItem({
    icon,
    label,
    active,
    collapsed,
}: SidebarItemProps) {
    // Mengambil preferensi dark mode dari sistem pengguna
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    return (
        <button
            className={`
                flex items-center gap-3 py-2 px-4 rounded-lg transition-all hover:cursor-pointer group
                ${
                    // Mengatur warna latar belakang dan teks berdasarkan status aktif dan dark mode
                    active
                        ? isDarkMode
                            ? "bg-[#18171F]"
                            : "bg-[#f5f5f7]"
                        : isDarkMode
                        ? "text-white hover:bg-[#f5f5f7] hover:text-black"
                        : "text-black hover:bg-[#18171F] hover:text-white"
                }
                ${
                    // Mengatur warna teks saat collapsed (terlipat) berdasarkan dark mode
                    collapsed
                        ? `${isDarkMode ? "text-white" : "text-black"}`
                        : `text-white`
                }
            `}
        >
            {/* Bagian ikon */}
            <span
                className={`
                    flex rounded-full transition-all
                    ${
                        collapsed
                            ? `${
                                  // Mengatur warna latar belakang ikon saat collapsed
                                  isDarkMode
                                      ? "bg-white group-hover:bg-black"
                                      : "bg-black group-hover:bg-white"
                              }`
                            : `${
                                  // Mengatur warna latar belakang ikon saat tidak collapsed
                                  isDarkMode
                                      ? "bg-white group-hover:bg-black"
                                      : "bg-white group-hover:bg-white"
                              }`
                    }
                `}
            >
                {icon} {/* Menampilkan ikon yang diberikan */}
            </span>

            {/* Bagian label */}
            <span className={active ? "font-bold" : "font-medium"}>
                {label}
                {/* Menampilkan teks label dengan gaya font berdasarkan status aktif */}
            </span>
        </button>
    );
}
