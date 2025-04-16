import { useMedia } from "react-use";
import React, { useState, FC } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FloatingLabelFormProps } from "@/interface/FloatingLabelFormProps";

// Komponen input dengan label mengambang dan toggle password
const FloatingLabelForm: FC<FloatingLabelFormProps> = ({
    type,
    icon,
    label,
    placeholder,
}) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    const hasText = value.length > 0 || isFocused;
    const isPassword = type === "password";

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
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
                    type={isPassword && showPassword ? "text" : type}
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
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FloatingLabelForm;
