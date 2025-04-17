import { useMedia } from "react-use";
import { ChevronDown } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";
import React, { Children, isValidElement, cloneElement, Dispatch } from "react";

// Komponen SidebarItem untuk menampilkan item sidebar dengan fitur dropdown
export default function SidebarItem({
    icon,
    title,
    label,
    index,
    active,
    children,
    collapsed,
    openDropdownIndex,
    setOpenDropdownIndex,
}: SidebarItemProps & {
    openDropdownIndex: number | null;
    setOpenDropdownIndex: Dispatch<React.SetStateAction<number | null>>;
}) {
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan mode gelap atau terang
    const isDropdown = !!children; // Menandakan apakah item ini memiliki dropdown

    // Fungsi untuk menangani klik pada item, membuka atau menutup dropdown
    const handleClick = () => {
        if (isDropdown) {
            if (openDropdownIndex === index) {
                setOpenDropdownIndex(null); // Tutup dropdown jika item yang sama diklik
            } else {
                setOpenDropdownIndex(index); // Buka dropdown untuk item yang baru
            }
        }
    };

    // Konten untuk button item sidebar, termasuk ikon dan label
    const content = (
        <button
            onClick={handleClick} // Panggil handleClick saat button diklik
            className={`
            flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ease-in-out
            ${
                active
                    ? `${
                          isDarkMode
                              ? "bg-[#18171F] text-[#f5f5f7]"
                              : "bg-[#f5f5f7] text-[#18171F]"
                      } rounded-l-full w-[calc(100%+1rem)]`
                    : `${
                          isDarkMode
                              ? "text-[#f5f5f7] hover:bg-[#18171F] hover:text-[#f5f5f7]"
                              : "text-[#f5f5f7] hover:bg-[#f5f5f7] hover:text-[#18171F]"
                      } w-full hover:cursor-pointer`
            }
            ${collapsed ? "justify-center" : "justify-start"}
        `}
        >
            <span className="flex justify-center items-center">{icon}</span>{" "}
            {/* Menampilkan ikon */}
            {!collapsed && ( // Menampilkan label hanya jika sidebar tidak ter-collapse
                <div className="flex items-center justify-between flex-1">
                    <span className={active ? "font-bold" : "font-semibold"}>
                        {label} {/* Menampilkan label item */}
                    </span>

                    {isDropdown && ( // Jika item memiliki dropdown, tampilkan ikon panah
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                                openDropdownIndex === index
                                    ? "rotate-180" // Rotasi ikon jika dropdown terbuka
                                    : "rotate-0"
                            }`}
                        />
                    )}
                </div>
            )}
        </button>
    );

    return (
        <div className="relative">
            {/* Jika sidebar ter-collapse, tampilkan tooltip dengan delay */}
            {collapsed ? (
                <Tooltip.Provider delayDuration={300}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content
                                side="right"
                                align="center"
                                className={`text-sm rounded px-3 py-1 shadow-md z-50 font-semibold
                                    ${
                                        isDarkMode
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                    }
                                `}
                            >
                                {title}
                                {/* Tooltip dengan judul jika sidebar ter-collapse */}
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
                content
            )}

            {/* Menampilkan dropdown saat sidebar tidak ter-collapse */}
            <AnimatePresence initial={false}>
                {!collapsed && openDropdownIndex === index && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 mt-1 flex flex-col space-y-2"
                    >
                        {children} {/* Menampilkan item dropdown */}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menampilkan dropdown saat sidebar ter-collapse (samping) */}
            <AnimatePresence initial={false}>
                {collapsed && openDropdownIndex === index && (
                    <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-full top-0 z-50 ml-2 w-48 rounded-md shadow-lg p-2"
                    >
                        <div className="flex flex-col space-y-2">
                            {Children.map(children, (child) =>
                                isValidElement(child)
                                    ? cloneElement(child, {
                                          collapsed: false, // Menyebarkan props ke dropdown item
                                      })
                                    : child
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
