"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { IoCloud, IoRainy } from "react-icons/io5";
import LogoBMKG from "@/components/common/LogoBMKG";
import { HiOutlineChevronLeft } from "react-icons/hi";
import SidebarItem from "@/interface/common/SidebarItem";
import { FaHome, FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const pathname = usePathname(); // Mengambil pathname saat ini untuk menentukan item yang aktif
    const [collapsed, setCollapsed] = useState(false); // State untuk sidebar collapsed (terlipat)

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle state collapsed untuk mengubah ukuran sidebar
    };

    return (
        <aside
            className={`relative h-screen bg-[#18171F] text-white flex flex-col shadow-lg transition-all duration-300 ease-in-out ${
                collapsed ? "w-16" : "w-64"
            }`}
        >
            {/* Judul dan Logo Sidebar */}
            <div
                className={`py-4 flex items-center justify-center border-b border-white ${
                    collapsed ? "flex justify-center" : "flex justify-between"
                }`}
            >
                {/* Logo BMKG */}
                <LogoBMKG />

                {/* Teks "Database Geofisika" hanya tampil jika sidebar tidak collapse */}
                {!collapsed && (
                    <p className="text-md font-bold">Database Geofisika</p>
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
                />
                {/* Item Iklim */}
                <SidebarItem
                    label="Iklim"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<IoCloud className="w-5 h-5" />}
                />
                {/* Item Geofisika */}
                <SidebarItem
                    label="Geofisika"
                    collapsed={collapsed}
                    active={pathname === "/profil"}
                    icon={<FaGlobeAsia className="w-5 h-5" />}
                />
                {/* Item Pos Hujan */}
                <SidebarItem
                    label="Pos Hujan"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<IoRainy className="w-5 h-5" />}
                />
            </nav>

            {/* Item Keluar */}
            <div className="p-4 border-t border-gray-700">
                <SidebarItem
                    label="Keluar"
                    collapsed={collapsed}
                    icon={<FaSignOutAlt className="w-5 h-5" />}
                />
            </div>

            {/* Ruang kosong di bagian bawah untuk memberikan jarak */}
            <span className="p-4 border-t border-gray-700 mb-5" />

            {/* Tombol Collapse untuk menyembunyikan/menampilkan sidebar */}
            <button
                className="absolute bottom-1 right-4 text-white p-2 hover:cursor-pointer"
                onClick={toggleSidebar} // Toggle sidebar ketika tombol di klik
            >
                <HiOutlineChevronLeft
                    className={`w-5 h-5 ${collapsed ? "rotate-180" : ""}`} // Rotasi ikon jika sidebar dalam keadaan collapsed
                />
            </button>
        </aside>
    );
}
