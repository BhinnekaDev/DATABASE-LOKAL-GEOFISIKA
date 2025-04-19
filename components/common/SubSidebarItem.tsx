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
                flex text-sm items-center gap-3 py-2 px-4 rounded-lg transition-all hover:cursor-pointer group
                ${
                    // Mengatur warna latar belakang dan teks berdasarkan status aktif dan dark mode
                    active
                        ? isDarkMode
                            ? "bg-[#18171F]"
                            : "bg-[#f5f5f7]"
                        : isDarkMode
                        ? "hover:bg-[#f5f5f7] hover:text-black"
                        : "hover:bg-[#18171F] hover:text-white"
                }
                ${
                    // Mengatur warna teks saat collapsed (terlipat) berdasarkan dark mode
                    collapsed
                        ? `${
                              !active
                                  ? `${
                                        isDarkMode ? "text-white" : "text-black"
                                    }`
                                  : `${
                                        isDarkMode
                                            ? "text-black bg-white"
                                            : "text-white bg-black"
                                    }`
                          }`
                        : `${
                              !active
                                  ? `text-white`
                                  : `${
                                        isDarkMode ? "text-white" : "text-black"
                                    }`
                          }`
                }
            `}
        >
            {/* Bagian ikon */}

            <span
                className={`
                    flex rounded-full transition-all relative
                    ${
                        collapsed
                            ? `${
                                  // Mengatur warna latar belakang ikon saat terlipat
                                  !active
                                      ? `${
                                            isDarkMode
                                                ? "bg-white group-hover:bg-black"
                                                : "bg-black group-hover:bg-white"
                                        }`
                                      : `${
                                            isDarkMode ? "bg-black" : "bg-white"
                                        }`
                              }`
                            : `
                            ${
                                // Mengatur warna latar belakang ikon saat tidak collapsed dan berdasarkan status aktif
                                !active
                                    ? `${
                                          isDarkMode
                                              ? "bg-white group-hover:bg-black"
                                              : "bg-white group-hover:bg-white"
                                      }`
                                    : `${isDarkMode ? "bg-white" : "bg-black"}`
                            }
                           `
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
