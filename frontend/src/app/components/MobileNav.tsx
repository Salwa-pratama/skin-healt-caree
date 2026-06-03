"use client";

import { useRouter } from "next/navigation";
import Dock, { DockItemData } from "./Dock";
import { useProfile } from "@/features/auth/api/profile.api";

type ActivePage = string;

interface MobileNavProps {
  activePage: ActivePage;
}

export default function MobileNav({ activePage }: MobileNavProps) {
  const router = useRouter();
  const { data: user } = useProfile();

  const userItems: DockItemData[] = [
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "dashboard" ? "text-white" : "text-slate-400"}`}>grid_view</span>, 
      label: "Home", 
      onClick: () => router.push("/pages/dashboard") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "scan" ? "text-white" : "text-slate-400"}`}>biotech</span>, 
      label: "Scan", 
      onClick: () => router.push("/pages/scan") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "history" ? "text-white" : "text-slate-400"}`}>history</span>, 
      label: "History", 
      onClick: () => router.push("/pages/history") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "setting" ? "text-white" : "text-slate-400"}`}>settings</span>, 
      label: "Settings", 
      onClick: () => router.push("/pages/setting") 
    },
  ];

  const adminItems: DockItemData[] = [
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "admin-dashboard" ? "text-white" : "text-slate-400"}`}>grid_view</span>, 
      label: "Home", 
      onClick: () => router.push("/pages/admin-dashboard") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "admin-users" ? "text-white" : "text-slate-400"}`}>group</span>, 
      label: "Users", 
      onClick: () => router.push("/pages/admin-users") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "admin-acne-solutions" ? "text-white" : "text-slate-400"}`}>medical_services</span>, 
      label: "Solutions", 
      onClick: () => router.push("/pages/admin-acne-solutions") 
    },
    { 
      icon: <span className={`material-symbols-outlined text-2xl ${activePage === "setting" ? "text-white" : "text-slate-400"}`}>settings</span>, 
      label: "Settings", 
      onClick: () => router.push("/pages/setting") 
    },
  ];

  const items = user?.role === "admin" ? adminItems : userItems;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
      <Dock 
        items={items}
        panelHeight={72}
        baseItemSize={50}
        magnification={85}
        distance={150}
      />
    </div>
  );
}
