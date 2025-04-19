import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import React, { useState, ChangeEvent, FC } from "react";
import { SearchBarProps } from "@/interface/common/SearchBarProps";

// Komponen SearchBar
const SearchBar: FC<SearchBarProps> = ({
    searchRef,
    isDarkMode,
    searchQuery,
    setSearchQuery,
    isDropdownSearchOpen,
    setIsDropdownSearchOpen,
}) => {
    const [isFocused, setIsFocused] = useState(false); // Menangani fokus input

    // Menangani perubahan pada input pencarian
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        setIsDropdownSearchOpen(query.length > 0);
    };

    // Fungsi untuk menghapus pencarian
    const handleClearSearch = () => {
        setSearchQuery("");
        setIsDropdownSearchOpen(false);
    };

    return (
        <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="hidden items-center space-x-4 lg:flex"
        >
            <div className="relative">
                {/* Input Pencarian */}
                <motion.input
                    type="text"
                    placeholder="Cari sesuatu..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`pl-11 pr-4 py-2 border w-96 rounded-full focus:outline-none font-semibold shadow-md duration-300 transition-all ${
                        isDarkMode
                            ? "border-white text-white bg-black/20 placeholder-white/60"
                            : "border-black text-black bg-white placeholder-black/50"
                    }`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />

                {/* Icon Pencarian */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                        opacity: isFocused ? 1 : 0.7,
                        x: isFocused ? 0 : 2,
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className={`absolute left-4 top-3 w-5 h-5 ${
                        isDarkMode ? "text-white" : "text-black"
                    }`}
                >
                    <FiSearch />
                </motion.div>

                {/* Icon X untuk menghapus pencarian */}
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute right-3 top-3 w-5 h-5 cursor-pointer transition-colors duration-300 ${
                            isDarkMode
                                ? "text-white hover:text-white/70"
                                : "text-black hover:text-black/70"
                        }`}
                        onClick={handleClearSearch}
                    >
                        <FiX />
                    </motion.div>
                )}

                {/* Dropdown hasil pencarian */}
                {isDropdownSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        layout
                        className={`absolute left-0 right-0 mt-2 w-96 rounded-xl shadow-xl overflow-hidden z-10 ${
                            isDarkMode
                                ? "bg-black text-white"
                                : "bg-white text-black"
                        }`}
                    >
                        <ul>
                            {searchQuery && (
                                <li
                                    className={`p-3 text-sm italic border-b ${
                                        isDarkMode
                                            ? "border-white/90"
                                            : "border-black/90"
                                    }`}
                                >
                                    Rekomendasi: “{searchQuery}”
                                </li>
                            )}
                            {["Hasil Pencarian 1", "Hasil Pencarian 2"].map(
                                (item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <a
                                            href={`#result${index + 1}`}
                                            className={`block px-4 py-3 transition-all ${
                                                isDarkMode
                                                    ? "hover:bg-[#18171F]"
                                                    : "hover:bg-[#f5f5f7]"
                                            }`}
                                        >
                                            {item}
                                        </a>
                                    </motion.li>
                                )
                            )}
                        </ul>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default SearchBar;
