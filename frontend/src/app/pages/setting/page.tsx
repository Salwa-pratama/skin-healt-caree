import { Suspense } from "react";
import SettingPage from "./settings";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center"><p className="text-[#6f7b67]">Memuat...</p></div>}>
      <SettingPage />
    </Suspense>
  );
}
