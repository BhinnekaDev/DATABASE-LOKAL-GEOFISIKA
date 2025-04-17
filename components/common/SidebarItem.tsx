import React from "react";
import { useMedia } from "react-use";
import * as Tooltip from "@radix-ui/react-tooltip";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";

// Komponen SidebarItem digunakan untuk menampilkan item navigasi pada sidebar
export default function SidebarItem({
    icon,
    title,
    label,
    active,
    collapsed,
}: SidebarItemProps) {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan apakah pengguna menggunakan dark mode

    // Isi konten utama item sidebar (ikon + label)
    const content = (
        <button
            className={`
                flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out
                ${
                    active
                        ? `${
                              // Jika item aktif, ubah warna latar belakang dan teks
                              isDarkMode
                                  ? "bg-[#18171F] text-[#f5f5f7]"
                                  : "bg-[#f5f5f7] text-[#18171F]"
                          } rounded-l-full w-[calc(100%+1rem)]`
                        : `${
                              // Jika item tidak aktif, gunakan warna default dengan efek hover
                              isDarkMode
                                  ? "text-[#f5f5f7] hover:bg-[#18171F] hover:text-[#f5f5f7]"
                                  : "text-[#f5f5f7] hover:bg-[#f5f5f7] hover:text-[#18171F]"
                          } w-full hover:cursor-pointer`
                }
                ${collapsed ? "justify-center" : "justify-start"}
            `}
        >
            {/* Ikon item */}
            <span className="flex justify-center items-center">{icon}</span>

            {/* Label hanya ditampilkan jika sidebar tidak collapse */}
            {!collapsed && (
                <span className={active ? "font-bold" : "font-semibold"}>
                    {label} {/* Menampilkan teks label */}
                </span>
            )}
        </button>
    );

    // Jika sidebar dalam keadaan collapse, tampilkan tooltip saat hover
    return collapsed ? (
        <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
                {/* Trigger tooltip saat elemen di-hover atau di-klik */}
                <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>

                {/* Konten tooltip, yang akan muncul di sebelah kanan item */}
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="right"
                        align="center"
                        className={`text-sm rounded px-3 py-1 shadow-md z-50 font-semibold text-white
                            ${
                                isDarkMode
                                    ? "bg-black text-white "
                                    : "bg-white text-black"
                            }
                        `}
                    >
                        {title} {/* Menampilkan teks judul dari tooltip */}
                        <Tooltip.Arrow
                            className={`${
                                isDarkMode ? "fill-black" : "fill-white"
                            }`}
                        />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    ) : (
        // Jika sidebar tidak collapse, tampilkan konten biasa tanpa tooltip
        content
    );
}
