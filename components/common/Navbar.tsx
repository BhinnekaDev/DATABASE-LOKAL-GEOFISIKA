import { useMedia } from "react-use";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import Button from "@/components/common/Button";
import SearchBar from "@/components/common/SearchBar";
import React, { useState, useEffect, useRef } from "react";
import ProfileImage from "@/components/common/ProfileImage";
import NotificationIcon from "@/components/common/NotificationIcon";
import { useModal } from "@/context/ModalContext";

export default function Navbar() {
  const { setIsOpenModal } = useModal();
  const pathname = usePathname(); // Mendapatkan path saat ini untuk menentukan item sidebar yang aktif
  // Referensi untuk mendeteksi klik di luar dropdown
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // State untuk menyimpan query dari input pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // State untuk toggle menu versi mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Deteksi tema gelap atau terang berdasarkan preferensi sistem
  const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

  // State untuk dropdown pencarian dan profil
  const [isDropdownSearchOpen, setIsDropdownSearchOpen] = useState(false);
  const [isDropdownProfileOpen, setIsDropdownProfileOpen] = useState(false);

  // Fungsi untuk menutup dropdown ketika klik di luar elemen search/profile
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node) &&
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsDropdownSearchOpen(false);
      setIsDropdownProfileOpen(false);
    }
  };

  // Event listener dipasang saat komponen di-mount, dan dibersihkan saat unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi untuk toggle dropdown profil
  const handleAvatarClick = () => {
    setIsDropdownProfileOpen(!isDropdownProfileOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-8xl sticky top-0 z-50 px-4 py-2 sm:px-6 lg:px-8 border-b rounded-b-xl shadow-sm ${
        isDarkMode ? "shadow-white/80" : "shadow-black/80"
      }`}
    >
      <div className="flex justify-between items-center h-16">
        <SearchBar
          searchRef={searchRef}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDropdownSearchOpen={isDropdownSearchOpen}
          setIsDropdownSearchOpen={setIsDropdownSearchOpen}
        />

        <button
          className={`lg:hidden text-2xl ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FiSearch />
        </button>

        {/* Notifikasi dan profil */}
        <div className="w-full flex items-center justify-end space-x-4">
          {/* Jika di halaman "/dashboard/iklim/hari-hujan", tampilkan tombol tambah data */}
          {(pathname === "/dashboard/iklim/hari-hujan" ||
            pathname === "/dashboard/iklim/penguapan" ||
            pathname === "/dashboard/iklim/tekanan-udara" ||
            pathname === "/dashboard/iklim/intensitas-hujan" ||
            pathname === "/dashboard/iklim/kelembaban-udara" ||
            pathname === "/dashboard/iklim/suhu-udara-minimum" ||
            pathname === "/dashboard/iklim/suhu-udara-rata-rata" ||
            pathname === "/dashboard/iklim/suhu-udara-maksimum" ||
            pathname === "/dashboard/iklim/arah-kecepatan-angin" ||
            pathname === "/dashboard/iklim/lama-penyinaran-matahari" ||
            pathname === "/dashboard/geofisika/gempa" ||
            pathname === "/dashboard/admin" ||
            pathname === "/dashboard/geofisika/petir/dataPetirIKL" ||
            pathname === "/dashboard/geofisika/petir/dataPetirKML" ||
            pathname === "/dashboard/geofisika/petir/dataPetirLDC" ||
            pathname === "/dashboard/geofisika/petir/dataPetirSummaries" ||
            pathname === "/dashboard/geofisika/petir/dataPetirCSV" ||
            pathname === "/dashboard/geofisika/petir/dataPetirSRF" ||
            pathname === "/dashboard/pos-hujan/kepahiang/kebawetan" ||
            pathname === "/dashboard/pos-hujan/kepahiang/keban-agung" ||
            pathname === "/dashboard/pos-hujan/kepahiang/kelobak" ||
            pathname === "/dashboard/pos-hujan/kepahiang/muara-kemumu" ||
            pathname === "/dashboard/pos-hujan/kepahiang/plta-musi" ||
            pathname === "/dashboard/pos-hujan/kepahiang/sebrang-musi" ||
            pathname === "/dashboard/pos-hujan/kepahiang/tebat-karai" ||
            pathname === "/dashboard/pos-hujan/kepahiang/ujan-mas" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/air-bening" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/air-pikat" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/bengko" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/bukit-kaba" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/curup" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/curup-bipp" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/mojorejo" ||
            pathname ===
              "/dashboard/pos-hujan/rajang-lebong/padang-ulak-tanding" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/pal-8" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/pt-argo" ||
            pathname === "/dashboard/pos-hujan/rajang-lebong/stiper" ||
            pathname === "/dashboard/pos-hujan/lebong/bungin" ||
            pathname === "/dashboard/pos-hujan/lebong/gunung-alam" ||
            pathname === "/dashboard/pos-hujan/lebong/lemeu" ||
            pathname === "/dashboard/pos-hujan/lebong/muara-aman" ||
            pathname === "/dashboard/pos-hujan/lebong/pinang-blapis" ||
            pathname === "/dashboard/pos-hujan/lebong/rimbo" ||
            pathname === "/dashboard/pos-hujan/lebong/simelo-atas" ||
            pathname === "/dashboard/pos-hujan/lebong/sukabumi" ||
            pathname === "/dashboard/pos-hujan/lebong/tapos" ||
            pathname === "/dashboard/pos-hujan/lebong/tes" ||
            pathname === "/dashboard/geofisika/tanda-waktu" ||
            pathname === "/dashboard/geofisika/data-sestifitas") && (
            <Button
              icon={<Plus />}
              setOpenModal={() => setIsOpenModal(true)}
              buttonStyle={`border-2 ${
                isDarkMode
                  ? "border-white hover:bg-white"
                  : "border-black hover:bg-black"
              } flex p-2 items-center justify-center rounded-full transition-colors duration-300 hover:cursor-pointer group`}
              textStyle={`${
                isDarkMode
                  ? "text-white group-hover:text-gray-900"
                  : "text-black group-hover:text-white"
              } font-semibold transition-colors duration-300`}
              text="Tambah Data"
            />
          )}

          <NotificationIcon isDarkMode={isDarkMode} notificationCount={3} />
          <ProfileImage
            profileRef={profileRef}
            isDarkMode={isDarkMode}
            handleAvatarClick={handleAvatarClick}
            isDropdownProfileOpen={isDropdownProfileOpen}
          />
        </div>
      </div>

      {/* Tampilan menu mobile ketika tombol search ditekan */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden fixed top-0 left-0 right-0 bottom-0 ${
            isDarkMode ? "bg-black/50" : "bg-white/50"
          } z-50`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`p-4 absolute top-16 left-0 right-0 w-96 mx-auto rounded-lg ${
              isDarkMode ? "bg-[#18171F]" : "bg-[#f5f5f7]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input pencarian di versi mobile */}
            <div className="relative">
              <input
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  isDarkMode
                    ? "border-white text-white"
                    : "border-black text-black"
                }`}
                placeholder="Cari sesuatu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownSearchOpen(true)}
              />

              {/* Dropdown hasil pencarian */}
              {isDropdownSearchOpen && searchQuery && (
                <motion.div
                  className={`absolute left-0 top-12 w-full ${
                    isDarkMode ? "bg-[#18171F]" : "bg-[#f5f5f7]"
                  } shadow-lg rounded-lg p-4 z-10 max-h-96 overflow-y-auto ${
                    isDarkMode ? "text-white bg-black" : "text-black bg-white"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  <ul>
                    <li
                      className={`p-2 ${
                        isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                      } cursor-pointer rounded-lg`}
                    >
                      Hasil Pencarian 1
                    </li>
                    <li
                      className={`p-2 ${
                        isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                      } cursor-pointer rounded-lg`}
                    >
                      Hasil Pencarian 2
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
