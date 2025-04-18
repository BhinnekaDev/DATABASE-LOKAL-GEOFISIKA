import React from "react";
import { useMedia } from "react-use";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";

export default function SubSidebarItem({
    icon,
    label,
    active,
    collapsed,
}: SidebarItemProps) {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    return (
        <button
            className={`
                flex items-center gap-3 py-2 px-4 rounded-lg transition-all
                ${
                    active
                        ? isDarkMode
                            ? "bg-[#18171F]"
                            : "bg-[#f5f5f7]"
                        : isDarkMode
                        ? "text-white hover:bg-[#18171F]"
                        : "text-black hover:bg-[#f5f5f7]"
                }
                ${
                    collapsed
                        ? `${isDarkMode ? "text-white" : "text-black"}`
                        : `text-white`
                }
            `}
        >
            <span
                className={`flex rounded-full ${
                    collapsed
                        ? `${isDarkMode ? "bg-white" : "bg-black"}`
                        : `bg-white`
                }`}
            >
                {icon}
            </span>
            <span className={active ? "font-bold" : "font-medium"}>
                {label}
            </span>
        </button>
    );
}
