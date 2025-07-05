import { useMedia } from "react-use";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Children, cloneElement, isValidElement } from "react";
import { SidebarItemProps } from "@/interface/common/SidebarItemProps";
import { useAutoOpenDropdown } from "@/hooks/clients/useAutoOpenDropdown";

// Komponen SidebarItem untuk menampilkan item sidebar dengan fitur dropdown
export default function SidebarItem({
    icon,
    title,
    label,
    index,
    route,
    active,
    children,
    collapsed,
    openDropdownIndex,
    setOpenDropdownIndex,
}: SidebarItemProps) {
    // Menggunakan hook useAutoOpenDropdown untuk mengatur index dropdown yang terbuka
    const { dropdownRef } = useAutoOpenDropdown({
        index,
        active,
        collapsed,
        openDropdownIndex,
        setOpenDropdownIndex,
    });

    // Mendapatkan instance router untuk navigasi
    const router = useRouter();

    // Menentukan apakah mode gelap (dark mode) digunakan
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    // Menandakan apakah item memiliki dropdown berdasarkan ada tidaknya children
    const isDropdown = !!children;

    // Fungsi untuk menangani klik pada item, membuka atau menutup dropdown
    const handleClick = () => {
        if (isDropdown) {
            // Jika dropdown sudah terbuka, tutup dropdown
            if (openDropdownIndex === index) {
                setOpenDropdownIndex(null);
            } else {
                // Jika dropdown belum terbuka, buka dropdown untuk item ini
                setOpenDropdownIndex(index);
            }
        } else if (route) {
            router.push(route); // Pindah halaman jika tidak ada dropdown
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
            <span className="flex justify-center items-center">{icon}</span>
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
                                    ? "rotate-180"
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
            {/* Menampilkan tooltip jika sidebar ter-collapse */}
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
                                {title}{" "}
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
                content // Menampilkan konten normal jika sidebar tidak ter-collapse
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
                        className={`absolute left-full top-0 z-50 ml-4 rounded-md shadow-lg p-2 ${
                            isDarkMode ? "bg-black" : "bg-white"
                        }`}
                    >
                        <div
                            ref={dropdownRef}
                            className="flex flex-col space-y-2 w-max"
                        >
                            {Children.map(children, (child) =>
                                isValidElement(child)
                                    ? cloneElement(child, {
                                          collapsed,
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
