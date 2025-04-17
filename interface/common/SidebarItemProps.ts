// SidebarItemProps.ts
import { ReactNode, ReactElement } from "react";

export interface SidebarItemProps {
    label: string; // Teks label yang ditampilkan
    index: number; // Indeks item
    title?: string; // Teks title yang ditampilkan
    icon: ReactNode; // Nama ikon (bisa untuk komponen ikon atau path)
    active?: boolean; // Menandakan apakah item ini aktif
    collapsed: boolean; // Menandakan apakah sidebar sedang collapsed
    children?:
        | ReactElement<SidebarItemProps>[]
        | ReactElement<SidebarItemProps>; // Menandakan apakah item ini memiliki anak
}
