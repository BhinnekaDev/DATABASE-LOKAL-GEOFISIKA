// ProfileImageProps
import { RefObject } from "react";

export interface ProfileImageProps {
    isDarkMode: boolean; // Menentukan apakah tema gelap aktif
    handleAvatarClick: () => void; // Fungsi untuk menangani klik pada avatar
    isDropdownProfileOpen: boolean; // Menentukan apakah dropdown profil terbuka
    profileRef: RefObject<HTMLDivElement | null>; // Referensi untuk elemen profil
}
