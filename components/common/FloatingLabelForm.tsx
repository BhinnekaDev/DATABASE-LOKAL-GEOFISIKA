import { useMedia } from "react-use";
import React, { useState, FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FloatingLabelFormProps } from "@/interface/common/FloatingLabelFormProps";

// Komponen input dengan label mengambang dan toggle password
const FloatingLabelForm: FC<FloatingLabelFormProps> = ({
    type,
    icon,
    label,
    placeholder,
}) => {
    const [value, setValue] = useState(""); // Menyimpan nilai input
    const [isFocused, setIsFocused] = useState(false); // Menyimpan status fokus input
    const [showPassword, setShowPassword] = useState(false); // Menyimpan status visibility password
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false); // Menentukan mode gelap atau terang

    const hasText = value.length > 0 || isFocused; // Mengecek apakah input memiliki teks atau fokus
    const isPassword = type === "password"; // Mengecek apakah tipe input password

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev); // Toggle visibility password
    };

    return (
        <div className="relative">
            {/* Label input */}
            <label
                className={`absolute text-lg font-semibold transition-all transform ${
                    hasText
                        ? "-top-4 scale-75 text-blue-500"
                        : `top-1 scale-100 ${
                              isDarkMode ? "text-white/50" : "text-black/50"
                          }`
                }`}
            >
                {label}
            </label>

            <div className="relative">
                {/* Ikon input */}
                {icon && (isFocused || hasText) && (
                    <div
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                            isDarkMode ? "text-white/50" : "text-black/50"
                        }`}
                    >
                        {icon}
                    </div>
                )}

                {/* Kolom input */}
                <input
                    type={isPassword && showPassword ? "text" : type} // Menentukan tipe input (password atau teks)
                    value={value}
                    placeholder={isFocused || hasText ? placeholder : ""}
                    className={`w-full px-3 py-2 ${
                        isPassword || icon ? "pl-10" : ""
                    } pr-10 border-b-2 text-sm sm:text-base ${
                        isDarkMode
                            ? "border-white/50 text-white/50"
                            : "border-black/50 text-black/50"
                    } focus:outline-none focus:ring-0 focus:border-[#135DFB]`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setValue(e.target.value)}
                />

                {/* Tombol lihat/simpan password */}
                {isPassword && (
                    <div
                        onClick={handleTogglePassword}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                            isDarkMode ? "text-white/50" : "text-black/50"
                        }`}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                        {/* Ikon toggle password */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingLabelForm;
