"use client";
import React from "react";
import { useMedia } from "react-use";
import LogoBMKG from "@/components/LogoBMKG";
import CardLogin from "@/components/CardLogin";
import { FaEnvelope, FaLock } from "react-icons/fa";
import BackgroundLogin from "@/components/BackgroundLogin";
import FloatingLabelForm from "@/components/FloatingLabelForm";

export default function Login() {
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
                            <form className="w-full mt-5 flex flex-col gap-6">
                                <FloatingLabelForm
                                    type="email"
                                    label="Email"
                                    icon={<FaEnvelope />}
                                    placeholder="contoh@email.com"
                                />

                                <FloatingLabelForm
                                    type="password"
                                    icon={<FaLock />}
                                    label="Kata Sandi"
                                    placeholder="**********"
                                />

                                {/* Tombol masuk */}
                                <button className="bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200">
                                    Masuk
                                </button>
                            </form>

                            {/* Footer */}
                            <p className="text-xs text-gray-500 mt-4 text-center">
                                © {new Date().getFullYear()} Bhinneka Dev –
                                Berkarya untuk Indonesia yang lebih baik.
                            </p>
                        </div>
                    </CardLogin>
                </div>
            </BackgroundLogin>
        </section>
    );
}
