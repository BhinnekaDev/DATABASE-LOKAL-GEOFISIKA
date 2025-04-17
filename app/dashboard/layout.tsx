import React, { ReactNode } from "react";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}

            {/* Konten utama */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                {/* Halaman */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
