// SearchBarProps.ts
import { RefObject } from "react";

// Properti untuk komponen SearchBar
export interface SearchBarProps {
    isDarkMode: boolean; // Mode gelap aktif atau tidak
    searchQuery: string; // Teks yang diketik user
    isDropdownSearchOpen: boolean; // Status dropdown pencarian
    setSearchQuery: (value: string) => void; // Ubah teks pencarian
    searchRef: RefObject<HTMLDivElement | null>; // Referensi ke elemen pencarian
    setIsDropdownSearchOpen: (value: boolean) => void; // Ubah status dropdown
}
