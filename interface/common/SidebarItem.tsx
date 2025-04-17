import React from "react";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";

// Komponen untuk menampilkan item sidebar
export default function SidebarItem({
    icon,
    label,
    active,
    collapsed,
}: SidebarItemProps) {
    return (
        <button
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out ${
                active
                    ? "bg-white text-[#18171F] rounded-l-full w-[calc(100%+2rem)]"
                    : "text-white hover:bg-white hover:text-[#18171F] w-full hover:cursor-pointer"
            } ${collapsed ? "justify-center" : "justify-start"}`}
        >
            {/* Menampilkan ikon */}
            <span className="flex justify-center items-center">{icon}</span>

            {/* Menampilkan label hanya jika sidebar tidak collapse */}
            {!collapsed && (
                <span className={`${active ? "font-bold" : "font-semibold"}`}>
                    {label}
                </span>
            )}
        </button>
    );
}
