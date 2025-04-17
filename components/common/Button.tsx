import React from "react";
import { ButtonProps } from "@/interface/common/ButtonProps";

// Komponen tombol reusable
export default function Button({
    type,
    text,
    textStyle,
    buttonStyle,
}: ButtonProps) {
    return (
        // Tombol dengan gaya dinamis dari props
        <button type={type} className={`${buttonStyle}`}>
            <span className={textStyle}>{text}</span>
        </button>
    );
}
