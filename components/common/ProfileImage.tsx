import React, { FC } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { ProfileImageProps } from "@/interface/common/ProfileImageProps";

// Daftar item menu dropdown profil
const menuItemsProfile = [
    { label: "Profil", icon: <FiUser className="mr-2" />, link: "#profile" },
    {
        label: "Pengaturan",
        icon: <FiSettings className="mr-2" />,
        link: "#settings",
    },
    { label: "Keluar", icon: <FiLogOut className="mr-2" />, link: "#logout" },
];

// Komponen gambar profil dengan dropdown menu
const ProfileImage: FC<ProfileImageProps> = ({
    profileRef,
    isDarkMode,
    handleAvatarClick,
    isDropdownProfileOpen,
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group"
            ref={profileRef}
        >
            {/* Avatar pengguna dengan border gradasi */}
            <div className="p-[2px] bg-gradient-to-tr from-blue-500 to-green-600 rounded-full">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border-[2px] border-white dark:border-gray-900 hover:opacity-90 transition duration-300 cursor-pointer"
                    onClick={handleAvatarClick}
                />
            </div>

            {/* Dropdown menu muncul jika isDropdownProfileOpen true */}
            {isDropdownProfileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute right-0 mt-3 w-56 z-50 rounded-xl shadow-xl border ${
                        isDarkMode
                            ? "bg-black border-[#2a2a2a] text-white"
                            : "bg-white border-gray-200 text-black"
                    }`}
                >
                    <ul className="py-2">
                        {menuItemsProfile.map((item, index) => (
                            <React.Fragment key={index}>
                                {/* Tambahkan garis pemisah sebelum Logout */}
                                {item.label === "Keluar" && (
                                    <hr
                                        className={`my-2 border-t ${
                                            isDarkMode
                                                ? "border-[#2a2a2a]"
                                                : "border-gray-200"
                                        }`}
                                    />
                                )}
                                <li>
                                    {/* Setiap item menu memiliki ikon dan label */}
                                    <a
                                        href={item.link}
                                        className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                                            item.label === "Keluar"
                                                ? isDarkMode
                                                    ? "hover:text-red-500 hover:bg-[#18171F]"
                                                    : "hover:text-red-600 hover:bg-[#f5f5f7]"
                                                : isDarkMode
                                                ? "hover:text-blue-500 hover:bg-[#18171F]"
                                                : "hover:text-blue-700 hover:bg-[#f5f5f7]"
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProfileImage;
