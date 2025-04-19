import React from "react";
import { useMedia } from "react-use";
import { motion } from "framer-motion";
import { FaInstagram, FaGlobe } from "react-icons/fa";

// Komponen Footer yang menampilkan informasi hak cipta dan ikon media sosial
export default function Footer() {
    // Mengambil preferensi dark mode dari sistem pengguna
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    return (
        // Elemen footer dengan kelas untuk styling yang lebih menarik dan responsif
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`w-full mt-8 py-6 px-10 text-sm md:text-md border-t rounded-t-xl ${
                isDarkMode
                    ? "bg-[#18171F] text-[#f5f5f7] border-[#444]"
                    : "bg-[#f5f5f7] text-[#18171F] border-[#ddd]"
            }`}
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Menampilkan tahun dan pesan hak cipta */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="font-semibold text-center md:text-left w-full md:w-auto"
                >
                    &copy; {new Date().getFullYear()} Bhinneka Dev – Berkarya
                    untuk Indonesia yang lebih baik.
                </motion.span>

                {/* Ikon media sosial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex gap-6 mt-4 md:mt-0 justify-center md:justify-end w-full md:w-auto"
                >
                    {/* Ikon Instagram */}
                    <motion.a
                        href="https://instagram.com/bhinnekaDev"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.3,
                            rotate: 10,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-xl text-inherit"
                    >
                        <FaInstagram />
                    </motion.a>

                    {/* Ikon Website */}
                    <motion.a
                        href="https://bhinneka-dev.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{
                            scale: 1.3,
                            rotate: -10,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-xl text-inherit"
                    >
                        <FaGlobe />
                    </motion.a>
                </motion.div>
            </div>
        </motion.footer>
    );
}
