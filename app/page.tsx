"use client";
import React from "react";
import { useMedia } from "react-use";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import CardLogin from "@/components/auth/CardLogin";
import LogoBMKG from "@/components/common/LogoBMKG";
import { FaEnvelope, FaLock } from "react-icons/fa";
import BackgroundLogin from "@/components/auth/BackgroundLogin";
import FloatingLabelForm from "@/components/common/FloatingLabelForm";

export default function Login() {
    const router = useRouter(); // Inisialisasi router untuk navigasi
    // Mengambil preferensi dark mode dari sistem pengguna
    const isDarkMode = useMedia("(prefers-color-scheme: dark)", false);

    return (
        <section className="font-[family-name:var(--font-lexend)] min-h-screen flex items-center justify-center">
            {/* Latar belakang login */}
            <BackgroundLogin>
                {/* Konten utama */}
                <div className="p-4 md:p-0">
                    {/* Kartu login */}
                    <CardLogin>
                        <div className="flex flex-col gap-y-4 w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg">
                            {/* Logo BMKG */}
                            <LogoBMKG />

                            {/* Judul dan deskripsi */}
                            <div className="flex flex-col gap-y-2">
                                <h1
                                    className={`text-2xl font-bold ${
                                        isDarkMode ? "text-white" : "text-black"
                                    }`}
                                >
                                    Selamat Datang
                                </h1>
                                <p
                                    className={`text-sm font-semibold ${
                                        isDarkMode
                                            ? "text-white/50"
                                            : "text-black/50"
                                    }`}
                                >
                                    Masuk untuk melanjutkan ke Database Lokal
                                    Geofisika
                                </p>
                            </div>

                            {/* Form login */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    router.push("/dashboard");
                                }}
                                className="w-full mt-5 flex flex-col gap-6"
                            >
                                {/* Input email */}
                                <FloatingLabelForm
                                    type="email"
                                    label="Email"
                                    icon={<FaEnvelope />}
                                    placeholder="contoh@email.com"
                                />

                                {/* Input kata sandi */}
                                <FloatingLabelForm
                                    type="password"
                                    icon={<FaLock />}
                                    label="Kata Sandi"
                                    placeholder="**********"
                                />

                                {/* Tombol masuk */}
                                <Button
                                    text="Masuk"
                                    type="submit"
                                    textStyle="font-semibold text-white"
                                    buttonStyle="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 py-2 rounded-lg transition duration-200"
                                />
                            </form>

                            {/* Footer */}
                            <footer className="text-xs text-gray-500 mt-4 text-center">
                                &copy; {new Date().getFullYear()} Bhinneka Dev –
                                Berkarya untuk Indonesia yang lebih baik.
                            </footer>
                        </div>
                    </CardLogin>
                </div>
            </BackgroundLogin>
        </section>
    );
}
