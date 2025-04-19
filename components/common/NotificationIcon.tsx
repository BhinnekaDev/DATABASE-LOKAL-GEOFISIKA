import { motion } from "framer-motion";
import React, { FC, useState, useRef, useEffect } from "react";
import { FiBell, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { NotificationIconProps } from "@/interface/common/NotificationIconProps";

// Komponen utama NotificationIcon
const NotificationIcon: FC<NotificationIconProps> = ({
    isDarkMode,
    notificationCount,
}) => {
    // State untuk menampilkan atau menyembunyikan dropdown notifikasi
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // State untuk menyimpan data notifikasi
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Pesan Baru", read: true },
        { id: 2, message: "Pesan Baru 2", read: false },
        { id: 3, message: "Pesan Baru 3", read: false },
    ]);

    // Menggunakan useRef untuk referensi dropdown dan tombol untuk menangani klik luar
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Fungsi untuk toggle status dropdown notifikasi
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Menutup dropdown jika ada klik di luar area dropdown dan tombol
    useEffect(() => {
        // Event listener untuk mendeteksi klik di luar area dropdown
        const handleClickOutside = (event: MouseEvent) => {
            // Menutup dropdown jika klik di luar dropdown dan tombol
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        // Menambahkan event listener saat komponen dimuat
        document.addEventListener("mousedown", handleClickOutside);

        // Membersihkan event listener saat komponen dibersihkan
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fungsi untuk menandai notifikasi sebagai sudah dibaca
    const markAsRead = (id: number) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    // Fungsi untuk menghapus notifikasi
    const dismissNotification = (id: number) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    return (
        <motion.button
            ref={buttonRef}
            className="relative group"
            onClick={toggleDropdown}
        >
            {/* Ikon notifikasi dengan animasi */}
            <motion.div
                animate={
                    notificationCount > 0
                        ? { rotate: [0, -15, 15, -10, 10, 0] }
                        : {}
                }
                transition={
                    notificationCount > 0
                        ? { repeat: Infinity, duration: 2, delay: 3 }
                        : {}
                }
            >
                <FiBell
                    className={`w-8 h-8 group-hover:cursor-pointer transition-all duration-300 ${
                        isDarkMode
                            ? "text-white group-hover:text-white/70"
                            : "text-black group-hover:text-black/70"
                    }`}
                />
            </motion.div>

            {/* Menampilkan jumlah notifikasi jika lebih dari 0 */}
            {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-2 rounded-full animate-pulse">
                    {notificationCount}
                </span>
            )}

            {/* Dropdown untuk menampilkan daftar notifikasi */}
            {isDropdownOpen && (
                <motion.div
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 sm:w-80 ${
                        isDarkMode
                            ? "bg-black text-white"
                            : "bg-white text-black"
                    } shadow-lg rounded-lg p-4 z-10 max-h-96 overflow-y-auto transition-transform`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <h4 className="font-semibold text-xl mb-2">
                        Notifications
                    </h4>
                    <ul className="space-y-3">
                        {/* Menampilkan setiap notifikasi */}
                        {notifications.map((notif) => (
                            <li
                                key={notif.id}
                                className={`text-sm flex justify-between gap-2 sm:gap-0 items-center p-2 rounded-lg transition-all duration-300 hover:cursor-pointer ${
                                    isDarkMode
                                        ? "hover:bg-[#18171F]"
                                        : "hover:bg-[#f5f5f7]"
                                } ${
                                    notif.read
                                        ? `${
                                              isDarkMode
                                                  ? "text-gray-600"
                                                  : "text-gray-200"
                                          }`
                                        : `${
                                              isDarkMode
                                                  ? "text-white"
                                                  : "text-black"
                                          }`
                                }`}
                            >
                                {/* Pesan notifikasi */}
                                <span className="truncate font-semibold">
                                    {notif.message}
                                </span>
                                <div className="flex space-x-2">
                                    {/* Tombol untuk menandai sebagai dibaca */}
                                    {!notif.read && (
                                        <div
                                            role="button"
                                            className="text-xs text-blue-500 hover:text-blue-900 transition-colors duration-300 cursor-pointer"
                                            onClick={() => markAsRead(notif.id)}
                                        >
                                            <FiCheckCircle className="w-5 h-5" />
                                        </div>
                                    )}
                                    {/* Tombol untuk menghapus notifikasi */}
                                    <div
                                        role="button"
                                        className="text-xs text-red-500 hover:text-red-900 transition-colors duration-300 cursor-pointer"
                                        onClick={() =>
                                            dismissNotification(notif.id)
                                        }
                                    >
                                        <FiXCircle className="w-5 h-5" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.button>
    );
};

export default NotificationIcon;
