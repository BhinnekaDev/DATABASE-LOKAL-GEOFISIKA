import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoCloud, IoRainy } from "react-icons/io5";
import LogoBMKG from "@/components/common/LogoBMKG";
import { HiOutlineChevronLeft } from "react-icons/hi";
import SidebarItem from "@/components/common/SidebarItem";
import SubSidebarItem from "@/components/common/SubSidebarItem";
import { FaHome, FaGlobeAsia, FaSignOutAlt } from "react-icons/fa";

// komponen untuk menampilkan sidebar
export default function Sidebar() {
    const pathname = usePathname(); // Mendapatkan path saat ini untuk menentukan item sidebar yang aktif
    const [isClient, setIsClient] = useState(false); // Mengecek apakah aplikasi sedang berjalan di client-side
    const [collapsed, setCollapsed] = useState(false); // Status apakah sidebar dalam keadaan collapsed
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
        null
    ); // Index dropdown yang dibuka

    useEffect(() => {
        // Menandakan bahwa komponen telah dirender di sisi client
        setIsClient(true);

        // Cek apakah saat ini dalam tampilan mobile (lebar layar < 768px)
        const isMobile = window.innerWidth < 768;

        // Ambil status collapsed dari localStorage (jika ada)
        const savedState = localStorage.getItem("sidebarCollapsed");

        if (isMobile) {
            // Jika di mobile, sidebar otomatis collapsed
            setCollapsed(true);
            // Simpan status collapsed ke localStorage agar konsisten
            localStorage.setItem("sidebarCollapsed", "true");
        } else if (savedState !== null) {
            // Jika bukan mobile dan ada data di localStorage, gunakan data tersebut
            setCollapsed(savedState === "true");
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
        <motion.aside
            initial={{ width: 64 }}
            animate={{
                width: collapsed ? 64 : openDropdownIndex !== null ? 312 : 256,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative h-screen bg-slate-800 flex flex-col shadow-lg"
        >
            {/* Bagian Header Sidebar */}
            {/* Menampilkan Logo BMKG dan judul "Database Geofisika" jika sidebar tidak collapsed */}
            <div
                className={`py-4 flex items-center justify-center border-b border-[#f5f7f5]" ${
                    collapsed
                        ? "flex justify-center px-0"
                        : "flex justify-between px-3 -ml-4"
                }`}
            >
                <LogoBMKG /> {/* Logo BMKG */}
                {!collapsed && (
                    <p
                        className={`text-sm md:text-[1rem] font-bold text-[#f5f5f7]`}
                    >
                        Database Geofisika
                    </p>
                )}
            </div>

            {/* Bagian Navigasi Sidebar */}
            <nav
                className={`flex-1 p-4 space-y-4 mt-4 ${
                    !collapsed &&
                    "overflow-y-auto max-h-[calc(100vh-180px)] scroll-custom"
                }`}
            >
                {/* Item Dashboard */}
                {/* Sidebar item untuk Dashboard */}
                <SidebarItem
                    index={0}
                    label="Dashboard"
                    collapsed={collapsed}
                    active={pathname === "/dashboard"}
                    icon={<FaHome className="w-5 h-5" />}
                    title={collapsed ? "Dashboard" : undefined}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                />

                {/* Item Iklim */}
                {/* Sidebar item untuk Iklim dengan dropdown */}
                <SidebarItem
                    index={1}
                    label="Iklim"
                    title="Iklim"
                    collapsed={collapsed}
                    active={pathname.startsWith("/dashboard/iklim")}
                    icon={<IoCloud className="w-5 h-5" />}
                    openDropdownIndex={openDropdownIndex}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                >
                    {/* Dropdown untuk Hari Hujan */}
                    <SubSidebarItem
                        index={1}
                        label="Hari Hujan"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/iklim/hari-hujan"}
                    />
                    {/* Dropdown untuk Penguapan */}
                    <SubSidebarItem
                        index={2}
                        label="Penguapan"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/iklim/penguapan"}
                    />
                    {/* Dropdown untuk Tekanan Udara */}
                    <SubSidebarItem
                        index={3}
                        label="Tekanan Udara"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/iklim/tekanan-udara"}
                    />
                    {/* Dropdown untuk Itensitas Hujan */}
                    <SubSidebarItem
                        index={4}
                        label="Itensitas Hujan"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/iklim/itensitas-hujan"}
                    />
                    {/* Dropdown untuk Kelembaban Udara */}
                    <SubSidebarItem
                        index={5}
                        label="Kelembaban Udara"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname === "/dashboard/iklim/kelembaban-udara"
                        }
                    />
                    {/* Dropdown untuk Suhu Udara Minimun */}
                    <SubSidebarItem
                        index={6}
                        label="Suhu Udara Minimun"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname === "/dashboard/iklim/suhu-udara-minimun"
                        }
                    />
                    {/* Dropdown untuk Suhu Udara Rata Rata */}
                    <SubSidebarItem
                        index={7}
                        label="Suhu Udara Rata Rata"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname === "/dashboard/iklim/suhu-udara-rata-rata"
                        }
                    />
                    {/* Dropdown untuk Suhu Udara Maksimum */}
                    <SubSidebarItem
                        index={8}
                        label="Suhu Udara Maksimum"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname === "/dashboard/iklim/suhu-udara-maksimum"
                        }
                    />
                    {/* Dropdown untuk Arah & Kecepatan Angin */}
                    <SubSidebarItem
                        index={9}
                        collapsed={collapsed}
                        label="Arah & Kecepatan Angin"
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname === "/dashboard/iklim/arah-kecepatan-angin"
                        }
                    />
                    {/* Dropdown untuk Lama Penyinaran Matahari */}
                    <SubSidebarItem
                        index={10}
                        collapsed={collapsed}
                        label="Lama Penyinaran Matahari"
                        icon={<span className="w-2 h-2" />}
                        active={
                            pathname ===
                            "/dashboard/iklim/lama-penyinaran-matahari"
                        }
                    />
                </SidebarItem>

                {/* Item Geofisika */}
                {/* Sidebar item untuk Geofisika dengan dropdown */}
                <SidebarItem
                    index={2}
                    label="Geofisika"
                    title="Geofisika"
                    collapsed={collapsed}
                    openDropdownIndex={openDropdownIndex}
                    active={pathname.startsWith("/dashboard/geofisika")}
                    icon={<FaGlobeAsia className="w-5 h-5" />}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                >
                    {/* Dropdown untuk Petir */}
                    <SubSidebarItem
                        index={1}
                        label="Petir"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/geofisika/petir"}
                    />
                    {/* Dropdown untuk Gempa */}
                    <SubSidebarItem
                        index={2}
                        label="Gempa"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/geofisika/gempa"}
                    />
                    {/* Dropdown untuk Tanda Waktu */}
                    <SubSidebarItem
                        index={3}
                        label="Tanda Waktu"
                        collapsed={collapsed}
                        icon={<span className="w-2 h-2" />}
                        active={pathname === "/dashboard/geofisika/tanda-waktu"}
                    />
                </SidebarItem>

                {/* Item Pos Hujan */}
                {/* Sidebar item untuk Pos Hujan */}
                <SidebarItem
                    index={3}
                    label="Pos Hujan"
                    collapsed={collapsed}
                    active={pathname === "/dashboard/pos-hujan"}
                    openDropdownIndex={openDropdownIndex}
                    icon={<IoRainy className="w-5 h-5" />}
                    title={collapsed ? "Pos Hujan" : undefined}
                    setOpenDropdownIndex={setOpenDropdownIndex}
                />
            </nav>

            {/* Item Keluar */}
            {/* Sidebar item untuk logout */}
            <div className="p-4 border-t border-[#f5f5f7]">
                <SidebarItem
                    index={4}
                    label="Keluar"
                    collapsed={collapsed}
                    openDropdownIndex={openDropdownIndex}
                    title={collapsed ? "Keluar" : undefined}
                    icon={<FaSignOutAlt className="w-5 h-5" />}
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
        </motion.aside>
    );
}
