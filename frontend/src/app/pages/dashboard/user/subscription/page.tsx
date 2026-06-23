"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "@/features/auth/api/profile.api";
import MobileNav from "@/app/components/MobileNav";
import { apiClient } from "@/lib/api-client";
import Script from "next/script";

const basePlansUI: Record<string, any> = {
  pasien: {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    gradient: "from-blue-600/20 to-cyan-500/10",
    border: "border-cyan-500/30",
    buttonColor: "bg-cyan-500 hover:bg-cyan-600",
  },
  dokter: {
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
    gradient: "from-amber-600/20 to-orange-500/10",
    border: "border-amber-500/30",
    buttonColor: "bg-amber-500 hover:bg-amber-600",
  },
  peneliti: {
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    gradient: "from-purple-600/20 to-pink-500/10",
    border: "border-purple-500/30",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
  },
};

export default function SubscriptionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPlans, setIsFetchingPlans] = useState(true);

  const { data: userProfile } = useProfile();
  const activeSub = userProfile?.userSubscriptions?.[0];
  const activePlanId = activeSub?.plan?.id;
  const activePlanPrice = activeSub?.plan?.price || 0;

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await apiClient.get('/feature/subscription/plans');
        const dbPlans = response.data.data;
        
        const mappedPlans = dbPlans.map((dbPlan: any) => {
          let uiStyle = basePlansUI['pasien'];
          if (dbPlan.planName.toLowerCase().includes('dokter')) uiStyle = basePlansUI['dokter'];
          else if (dbPlan.planName.toLowerCase().includes('peneliti')) uiStyle = basePlansUI['peneliti'];

          return {
            id: dbPlan.id,
            name: dbPlan.planName,
            price: dbPlan.price === 0 ? "Gratis" : `Rp ${dbPlan.price.toLocaleString('id-ID')} / bulan`,
            numericPrice: dbPlan.price,
            image: uiStyle.image,
            gradient: uiStyle.gradient,
            border: uiStyle.border,
            buttonColor: uiStyle.buttonColor,
            features: [
              `Scan upload foto ${dbPlan.maxScansPerMonth > 1000 ? '(Unlimited)' : `${dbPlan.maxScansPerMonth} kali per bulan`}`,
              `Tab to list ${dbPlan.maxTodoCards > 1000 ? '(Unlimited)' : `(${dbPlan.maxTodoCards} card)`}`,
              `Model AI: ${dbPlan.model}`,
              `Simpan history ${dbPlan.maxHistorySaved > 1000 ? '(Unlimited)' : `(${dbPlan.maxHistorySaved} card)`}`,
            ]
          };
        });

        mappedPlans.sort((a: any, b: any) => a.numericPrice - b.numericPrice);
        setPlans(mappedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsFetchingPlans(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribeClick = (plan: any) => {
    setSelectedPlan(plan);
    setDuration(1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPlan(null), 200); // Wait for transition
  };

  const handleConfirmSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/payment/subscribe", {
        planId: selectedPlan.id,
        duration: duration,
      });

      const data = response.data;

      if (data.token) {
        closeModal();
        (window as any).snap.pay(data.token, {
          onSuccess: async function (result: any) {
            try {
              if (data.orderId) {
                await apiClient.post(`/payment/verify/${data.orderId}`);
              }
            } catch (err) {
              console.error("Gagal verifikasi pembayaran secara lokal", err);
            }
            // Invalidate profile cache so limits update immediately
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            alert("Pembayaran berhasil!");
            router.refresh(); // Refresh halaman setelah sukses
          },
          onPending: function (result: any) {
            alert("Menunggu pembayaran!");
          },
          onError: function (result: any) {
            alert("Pembayaran gagal!");
          },
          onClose: function () {
            alert("Kamu menutup popup tanpa menyelesaikan pembayaran");
          },
        });
      } else {
        alert(data.message || "Langganan berhasil diaktifkan!");
        closeModal();
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      const backendMessage = error.response?.data?.message;
      alert(`Gagal memproses langganan: ${backendMessage || "Pastikan kamu sudah login."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <MobileNav activePage="dashboard" />
      
      {/* Back Button */}
      <div className="absolute top-6 left-4 md:left-8 z-50">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-card-bg)] text-[var(--dashboard-text)] rounded-full shadow-md border border-[var(--dashboard-border)] hover:bg-[var(--dashboard-bg)] transition-all hover:-translate-x-1"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span className="font-bold text-sm">Kembali</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-12 px-4 pt-20 md:pt-16">
        <div className="mb-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--dashboard-text)] tracking-tight">
            Pilih <span className="text-primary">Paket</span> Anda
          </h1>
          <p className="text-[var(--dashboard-text-secondary)] max-w-2xl mx-auto font-medium">
            Tingkatkan pengalaman Aether-med Anda dengan memilih paket yang sesuai dengan kebutuhan Anda. Dari pasien hingga peneliti medis.
          </p>
        </div>

        {/* Loading State */}
        {isFetchingPlans ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-4">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative bg-[var(--dashboard-card-bg)] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border ${plan.border} flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]`}
              >
                {/* Background Image Area */}
                <div className="h-48 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${plan.gradient} mix-blend-overlay z-10`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dashboard-card-bg)] to-transparent z-10"></div>
                  <img 
                    src={plan.image} 
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%]"
                  />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col z-20 -mt-10 relative">
                  <h3 className="text-2xl font-black text-[var(--dashboard-text)] mb-2 drop-shadow-md">
                    {plan.name}
                  </h3>
                  <div className="mb-6 flex items-end gap-1">
                    <span className="text-xl font-bold text-primary">
                      {plan.price.split(' / ')[0]}
                    </span>
                    {plan.price.includes('/') && (
                      <span className="text-xs text-[var(--dashboard-text-secondary)] font-medium mb-1">
                        / bulan
                      </span>
                    )}
                  </div>

                  <div className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                          check_circle
                        </span>
                        <p className="text-sm text-[var(--dashboard-text-secondary)] font-medium leading-tight">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {plan.numericPrice >= 0 && (
                    <button 
                      onClick={() => handleSubscribeClick(plan)}
                      disabled={plan.id === activePlanId || plan.numericPrice === 0}
                      className={`w-full py-4 rounded-xl text-white font-bold tracking-wide uppercase text-sm shadow-lg transition-all active:scale-95 ${plan.id === activePlanId || plan.numericPrice === 0 ? 'bg-slate-500 cursor-not-allowed opacity-80' : plan.buttonColor}`}
                    >
                      {plan.id === activePlanId ? 'Paket Saat Ini' : plan.numericPrice === 0 ? 'Paket Dasar' : 'Subscribe Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscription Modal */}
      {isModalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          <div className="relative w-full max-w-md bg-[var(--dashboard-card-bg)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--dashboard-border)] transform transition-all flex flex-col">
            {/* Modal Header */}
            <div className="relative h-32 overflow-hidden flex items-end p-6">
              <img 
                src={selectedPlan.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
                alt="background"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${selectedPlan.gradient} opacity-80`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--dashboard-card-bg)] to-transparent"></div>
              
              <div className="relative z-10 flex justify-between items-end w-full">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                    Detail Langganan
                  </p>
                  <h2 className="text-2xl font-black text-[var(--dashboard-text)]">
                    {selectedPlan.name}
                  </h2>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--dashboard-bg)]/50 backdrop-blur text-[var(--dashboard-text)] hover:bg-[var(--dashboard-bg)] transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="bg-[var(--dashboard-bg)] rounded-2xl p-4 mb-6 border border-[var(--dashboard-border)]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[var(--dashboard-text-secondary)]">Harga per bulan</span>
                  <span className="text-sm font-bold text-[var(--dashboard-text)]">{selectedPlan.price.split(' / ')[0]}</span>
                </div>
                
                {selectedPlan.numericPrice > 0 && (
                  <>
                    <div className="h-px w-full bg-[var(--dashboard-border)] my-3"></div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--dashboard-text-secondary)] mb-2">
                        Durasi Berlangganan (Bulan)
                      </label>
                      <div className="flex items-center gap-3 bg-[var(--dashboard-card-bg)] rounded-xl p-1 border border-[var(--dashboard-border)]">
                        <button 
                          onClick={() => setDuration(Math.max(1, duration - 1))}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] transition-colors"
                        >
                          <span className="material-symbols-outlined">remove</span>
                        </button>
                        <div className="flex-1 text-center font-bold text-lg text-[var(--dashboard-text)]">
                          {duration}
                        </div>
                        <button 
                          onClick={() => setDuration(duration + 1)}
                          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] transition-colors"
                        >
                          <span className="material-symbols-outlined">add</span>
                        </button>
                      </div>
                    </div>
                    <div className="h-px w-full bg-[var(--dashboard-border)] my-3"></div>
                    
                    {activePlanPrice > 0 && selectedPlan.numericPrice > activePlanPrice && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-green-500">Potongan Harga (Upgrade)</span>
                        <span className="text-xs font-bold text-green-500">
                          - Rp {activePlanPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[var(--dashboard-text)]">Total Pembayaran</span>
                      <span className="text-lg font-black text-primary">
                        Rp {Math.max(0, (selectedPlan.numericPrice * duration) - activePlanPrice).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </>
                )}
                {selectedPlan.numericPrice === 0 && (
                  <div className="mt-2 text-xs font-medium text-[var(--dashboard-text-secondary)] text-center">
                    Paket ini gratis dan aktif selamanya.
                  </div>
                )}
              </div>

              <button 
                onClick={handleConfirmSubscription}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl text-white font-bold tracking-wide uppercase text-sm shadow-lg transition-all active:scale-95 ${selectedPlan.buttonColor} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
