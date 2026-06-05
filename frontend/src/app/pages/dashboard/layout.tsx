"use client";
import { useState } from "react";
import Footer from "./components/Footer";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import "./dashboard.css";
export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <body className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
            <DashboardHeader
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <Sidebar activePage="dashboard" isOpen={isSidebarOpen} />
            <main className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pt-20 px-4 sm:px-6 pb-20 md:px-10 dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>

                {children}
            </main>
            <Footer />
        </body>
    )
}