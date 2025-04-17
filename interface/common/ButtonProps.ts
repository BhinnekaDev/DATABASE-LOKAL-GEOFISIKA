// ButtonProps.ts

export interface ButtonProps {
    text: string; // Teks yang akan ditampilkan di tombol
    textStyle?: string; // Gaya teks tombol (opsional)
    buttonStyle?: string; // Gaya tombol (opsional)
    type?: "button" | "submit" | "reset"; // Tipe tombol (opsional)
}
