// FloatingLabelFormProps.ts
import { ReactNode } from "react";

export interface FloatingLabelFormProps {
    type: string; // Tipe input (misalnya 'text', 'password', 'email', dll)
    label: string; // Label untuk input
    icon?: ReactNode; // Ikon opsional untuk input (misalnya, ikon di sebelah kiri input)
    placeholder?: string; // Placeholder opsional untuk input
}
