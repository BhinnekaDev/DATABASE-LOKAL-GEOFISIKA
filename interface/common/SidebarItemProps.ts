// SidebarItemProps.ts
import { ReactNode } from "react";

export interface SidebarItemProps {
    label: string; // Teks label yang ditampilkan
    icon: ReactNode; // Nama ikon (bisa untuk komponen ikon atau path)
    active?: boolean; // Menandakan apakah item ini aktif
    collapsed: boolean; // Menandakan apakah sidebar sedang collapsed
}
