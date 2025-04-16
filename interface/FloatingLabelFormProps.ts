// FloatingLabelFormProps.ts
import { ReactNode } from "react";

export interface FloatingLabelFormProps {
    type: string; // Tipe input
    label: string; // Label untuk input
    icon?: ReactNode; // Icon, opsional
    placeholder?: string; // Placeholder teks, opsional
}
