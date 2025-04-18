import { useMedia } from "react-use";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoCloud, IoRainy } from "react-icons/io5";
import LogoBMKG from "@/components/common/LogoBMKG";
import { HiOutlineChevronLeft } from "react-icons/hi";
import SidebarItem from "@/components/common/SidebarItem";
import SubSidebarItem from "@/components/common/SubSidebarItem";
import { FaHome, FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
    const pathname = usePathname(); // Mendapatkan path saat ini untuk menentukan item sidebar yang aktif
    const [isClient, setIsClient] = useState(false); // Mengecek apakah aplikasi sedang berjalan di client-side
    const [collapsed, setCollapsed] = useState(false); // Status apakah sidebar dalam keadaan collapsed
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan mode gelap atau terang
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
        null
    ); // Index dropdown yang dibuka

    useEffect(() => {
        setIsClient(true); // Menandakan bahwa komponen telah di-render di sisi client
        const savedState = localStorage.getItem("sidebarCollapsed");
        if (savedState !== null) {
            setCollapsed(savedState === "true"); // Memeriksa dan mengatur status collapse berdasarkan localStorage
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem("sidebarCollapsed", String(collapsed)); // Menyimpan status collapse ke localStorage
        }
    }, [collapsed, isClient]);

    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Toggle status collapse ketika tombol di klik
    };

    if (!isClient) return null; // Menghindari render pada server

    return (
        <aside
            className={`relative h-screen bg-slate-800 flex flex-col shadow-lg transition-all duration-300 ease-in-out ${
                collapsed ? "w-16" : "w-64"
            }`}
        >
            {/* Bagian Header Sidebar */}
            {/* Menampilkan Logo BMKG dan judul "Database Geofisika" jika sidebar tidak collapsed */}
            <div
                className={`py-4 flex items-center justify-center border-b border-[#f5f5f7]" ${
                    collapsed ? "flex justify-center" : "flex justify-between"
                }`}
            >
                <LogoBMKG /> {/* Logo BMKG */}
                {!collapsed && (
                    <p className={`text-md font-bold text-[#f5f5f7]`}>
                        Database Geofisika
                    </p>
                )}
            </div>

            {/* Bagian Navigasi Sidebar */}
            <nav className="flex-1 p-4 space-y-4 mt-4">
                {/* Item Dashboard */}
                {/* Sidebar item untuk Dashboard */}
                <SidebarItem
                    label="Dashboard"
                    collapsed={collapsed}
                    active={pathname === "/dashboard"}
                    icon={<FaHome className="w-5 h-5" />}
                    title={collapsed ? "Dashboard" : undefined}
                    index={0}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                />

                {/* Item Iklim */}
                {/* Sidebar item untuk Iklim dengan dropdown */}
                <SidebarItem
                    label="Iklim"
                    title="Iklim"
                    collapsed={collapsed}
                    active={pathname.startsWith("/iklim")}
                    icon={<IoCloud className="w-5 h-5" />}
                    index={1}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                >
                    {/* Dropdown untuk Suhu */}
                    <SubSidebarItem
                        index={1}
                        label="Suhu"
                        collapsed={collapsed}
                        active={pathname === "/iklim/suhu"}
                        icon={<span className="w-2 h-2" />}
                    />
                    {/* Dropdown untuk Kelembaban */}
                    <SubSidebarItem
                        index={2}
                        label="Kelembaban"
                        collapsed={collapsed}
                        active={pathname === "/iklim/kelembaban"}
                        icon={<span className="w-2 h-2" />}
                    />
                </SidebarItem>

                {/* Item Geofisika */}
                {/* Sidebar item untuk Geofisika dengan dropdown */}
                <SidebarItem
                    label="Geofisika"
                    title="Geofisika"
                    collapsed={collapsed}
                    active={pathname.startsWith("/geofisika")}
                    icon={<FaGlobeAsia className="w-5 h-5" />}
                    index={4}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                >
                    <SubSidebarItem
                        index={1}
                        label="Gempa"
                        collapsed={collapsed}
                        active={pathname === "/geofisika/gempa"}
                        icon={<span className="w-2 h-2" />}
                    />
                </SidebarItem>

                {/* Item Pos Hujan */}
                {/* Sidebar item untuk Pos Hujan */}
                <SidebarItem
                    label="Pos Hujan"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<IoRainy className="w-5 h-5" />}
                    title={collapsed ? "Pos Hujan" : undefined}
                    index={6}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                />
            </nav>

            {/* Item Keluar */}
            {/* Sidebar item untuk logout */}
            <div className="p-4 border-t border-[#f5f5f7]">
                <SidebarItem
                    label="Keluar"
                    collapsed={collapsed}
                    active={pathname === "/pengaturan"}
                    icon={<FaSignOutAlt className="w-5 h-5" />}
                    title={collapsed ? "Keluar" : undefined}
                    index={7}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                />
            </div>

            {/* Ruang kosong di bagian bawah untuk memberi jarak */}
            <span className="p-4 border-t border-[#f5f5f7] mb-5" />

            {/* Tombol Collapse untuk menyembunyikan/menampilkan sidebar */}
            <button
                className={`absolute bottom-1 right-4 p-2 hover:cursor-pointer text-[#f5f5f7]`}
                onClick={toggleSidebar} // Toggle sidebar saat tombol diklik
            >
                <HiOutlineChevronLeft
                    className={`w-5 h-5 ${collapsed ? "rotate-180" : ""}`}
                />
            </button>
        </aside>
    );
}
