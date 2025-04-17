import React from "react";
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
    // Isi konten utama item sidebar (ikon + label)
    const content = (
        <button
            className={`
                flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out
                ${
                    active
                        ? "bg-white text-[#18171F] rounded-l-full w-[calc(100%+2rem)]"
                        : "text-white hover:bg-white hover:text-[#18171F] w-full hover:cursor-pointer"
                }
                ${collapsed ? "justify-center" : "justify-start"}
            `}
        >
            {/* Ikon item */}
            <span className="flex justify-center items-center">{icon}</span>

            {/* Label hanya ditampilkan jika sidebar tidak collapse */}
            {!collapsed && (
                <span className={active ? "font-bold" : "font-semibold"}>
                    {label}
                </span>
            )}
        </button>
    );

    // Jika sidebar dalam keadaan collapse, tampilkan tooltip saat hover
    return collapsed ? (
        <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
                {/* Trigger tooltip saat elemen diklik atau dihover */}
                <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>

                {/* Konten tooltip */}
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="right"
                        align="center"
                        className="bg-black text-white text-sm rounded px-3 py-1 shadow-md z-50"
                    >
                        {title} {/* Teks yang ditampilkan dalam tooltip */}
                        <Tooltip.Arrow className="fill-gray-800" />{" "}
                        {/* Panah kecil pada tooltip */}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    ) : (
        // Jika sidebar tidak collapse, tampilkan konten biasa tanpa tooltip
        content
    );
}
