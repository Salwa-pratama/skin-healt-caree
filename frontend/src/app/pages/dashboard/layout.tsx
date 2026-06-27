"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer from "./components/Footer";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import "./dashboard.css";
// Suppress Mediapipe INFO logs that are printed as errors in WebAssembly
if (typeof console !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === "string" && args[0].includes("INFO: Created TensorFlow Lite XNNPACK delegate for CPU")) {
      return;
    }
    originalConsoleError(...args);
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const isSubscriptionPage = pathname?.includes("/subscription") && !pathname?.includes("/admin/subscriptions");

    if (isSubscriptionPage) {
        return (
            <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
                <main className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dashboard-animate-in">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
            <DashboardHeader
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <Sidebar activePage="dashboard" isOpen={isSidebarOpen} />
            <main className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pt-20 px-4 sm:px-6 pb-20 md:px-10 dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>

                {children}
            </main>
            <Footer />
        </div>
    )
}