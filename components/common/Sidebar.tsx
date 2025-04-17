import { useMedia } from "react-use";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoCloud, IoRainy } from "react-icons/io5";
import LogoBMKG from "@/components/common/LogoBMKG";
import { HiOutlineChevronLeft } from "react-icons/hi";
import SidebarItem from "@/components/common/SidebarItem";
import { FaHome, FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const pathname = usePathname(); // Path saat ini
    const [isClient, setIsClient] = useState(false); // Cek client-side
    const [collapsed, setCollapsed] = useState(false); // Sidebar collapse
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan mode gelap atau terang

    useEffect(() => {
        setIsClient(true); // Set setelah client render
        const savedState = localStorage.getItem("sidebarCollapsed");
        if (savedState !== null) {
            setCollapsed(savedState === "true"); // Ambil dari localStorage
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("sidebarCollapsed", String(collapsed)); // Simpan ke localStorage
        }
    }, [collapsed, isClient]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle sidebar
    };

    if (!isClient) return null; // Hindari render di server

    return (
        <aside
            className={`relative h-screen ${
                isDarkMode ? "bg-[#f5f5f7]" : "bg-[#18171F]"
            } text-white flex flex-col shadow-lg transition-all duration-300 ease-in-out ${
                collapsed ? "w-16" : "w-64"
            }`}
        >
            {/* Judul dan Logo Sidebar */}
            <div
                className={`py-4 flex items-center justify-center border-b ${
                    isDarkMode ? "border-[#18171F]" : "border-[#f5f5f7]"
                } ${
                    collapsed ? "flex justify-center" : "flex justify-between"
                }`}
            >
                {/* Logo BMKG */}
                <LogoBMKG />

                {/* Teks "Database Geofisika" hanya tampil jika sidebar tidak collapse */}
                {!collapsed && (
                    <p
                        className={`text-md font-bold ${
                            isDarkMode ? "text-[#18171F]" : "text-[#f5f5f7]"
                        }`}
                    >
                        Database Geofisika
                    </p>
                )}
            </div>

            {/* Navigasi Sidebar */}
            <nav className="flex-1 p-4 space-y-4 mt-4">
                {/* Item Dashboard */}
                <SidebarItem
                    label="Dashboard"
                    collapsed={collapsed}
                    active={pathname === "/dashboard"}
                    icon={<FaHome className="w-5 h-5" />}
                    title={collapsed ? "Dashboard" : undefined}
                />
                {/* Item Iklim */}
                <SidebarItem
                    label="Iklim"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<IoCloud className="w-5 h-5" />}
                    title={collapsed ? "Iklim" : undefined}
                />
                {/* Item Geofisika */}
                <SidebarItem
                    label="Geofisika"
                    collapsed={collapsed}
                    active={pathname === "/profil"}
                    icon={<FaGlobeAsia className="w-5 h-5" />}
                    title={collapsed ? "Geofisika" : undefined}
                />
                {/* Item Pos Hujan */}
                <SidebarItem
                    label="Pos Hujan"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<IoRainy className="w-5 h-5" />}
                    title={collapsed ? "Pos Hujan" : undefined}
                />
            </nav>

            {/* Item Keluar */}
            <div
                className={`p-4 border-t ${
                    isDarkMode ? "border-[#18171F]" : "border-[#f5f5f7]"
                }`}
            >
                <SidebarItem
                    label="Keluar"
                    collapsed={collapsed}
                    icon={<FaSignOutAlt className="w-5 h-5" />}
                    title={collapsed ? "Keluar" : undefined}
                />
            </div>

            {/* Ruang kosong di bagian bawah untuk memberikan jarak */}
            <span
                className={`p-4 border-t ${
                    isDarkMode ? "border-[#18171F]" : "border-[#f5f5f7]"
                } mb-5`}
            />

            {/* Tombol Collapse untuk menyembunyikan/menampilkan sidebar */}
            <button
                className={`absolute bottom-1 right-4 p-2 hover:cursor-pointer ${
                    isDarkMode ? "text-[#18171F]" : "text-[#f5f5f7]"
                }`}
                onClick={toggleSidebar} // Toggle sidebar ketika tombol di klik
            >
                <HiOutlineChevronLeft
                    className={`w-5 h-5 ${collapsed ? "rotate-180" : ""}`} // Rotasi ikon jika sidebar dalam keadaan collapsed
                />
            </button>
        </aside>
    );
}
