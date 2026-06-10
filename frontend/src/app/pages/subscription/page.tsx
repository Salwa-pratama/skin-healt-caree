"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Plan = {
  id: string;
  name: string;
  price: string;
  image: string;
  features: string[];
  color: string;
  glowColor: string;
};

const plans: Plan[] = [
  {
    id: "pasien",
    name: "Paket Pasien",
    price: "Gratis",
    image: "/images/patient.png",
    color: "from-blue-500/20 to-cyan-500/5",
    glowColor: "shadow-cyan-500/20",
    features: [
      "Scan upload foto terbatas (10x / bulan)",
      "Tab to do list terbatas (10 card)",
      "Model CNN akurasi standar",
      "Simpan history terbatas",
    ],
  },
  {
    id: "dokter",
    name: "Paket Dokter",
    price: "Rp 60.000 / bulan",
    image: "/images/doctor.png",
    color: "from-purple-500/20 to-fuchsia-500/5",
    glowColor: "shadow-purple-500/30",
    features: [
      "Scan lebih banyak (50x / bulan)",
      "Tab to do list luas (50 card)",
      "Model CNN menengah",
      "Simpan history (50 card)",
    ],
  },
  {
    id: "peneliti",
    name: "Paket Peneliti",
    price: "Rp 120.000 / bulan",
    image: "/images/researcher.png",
    color: "from-amber-500/20 to-orange-500/5",
    glowColor: "shadow-amber-500/40",
    features: [
      "Scan unlimited",
      "Tab to do list unlimited",
      "Model CNN terbaik",
      "Simpan history unlimited",
    ],
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [months, setMonths] = useState<number>(1);

  const openModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setMonths(1);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  const calculateTotal = (priceStr: string, months: number) => {
    if (priceStr === "Gratis") return "Gratis";
    const numericPrice = parseInt(priceStr.replace(/\D/g, ""));
    return `Rp ${(numericPrice * months).toLocaleString("id-ID")}`;
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6"
          >
            Pilih Paket Langganan Anda
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Tingkatkan pengalaman Aether-med Anda dengan paket yang disesuaikan untuk kebutuhan personal, profesional, maupun riset.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-b ${plan.color} border border-white/10 backdrop-blur-xl shadow-2xl ${plan.glowColor} flex flex-col`}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <Image
                  src={plan.image}
                  alt={plan.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute bottom-4 left-6 z-20">
                  <h3 className="text-3xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xl font-semibold text-gray-300">{plan.price}</p>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openModal(plan)}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-white text-black hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-black relative flex flex-col md:flex-row"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Image Section */}
              <div className="relative w-full md:w-2/5 h-48 md:h-auto hidden md:block">
                <Image
                  src={selectedPlan.image}
                  alt={selectedPlan.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900" />
              </div>

              {/* Modal Content Section */}
              <div className="p-8 w-full md:w-3/5 flex flex-col">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedPlan.name}</h2>
                <p className="text-gray-400 mb-6">{selectedPlan.price}</p>

                <div className="mb-6">
                  <h4 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-3">Termasuk:</h4>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <svg
                          className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedPlan.price !== "Gratis" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Durasi Langganan (Bulan)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={months}
                        onChange={(e) => setMonths(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                      <div className="bg-zinc-800 px-4 py-2 rounded-lg font-bold text-xl min-w-[3rem] text-center">
                        {months}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6 border-t border-zinc-800">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {calculateTotal(selectedPlan.price, months)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Berhasil subscribe ke ${selectedPlan.name} selama ${months} bulan!`);
                      closeModal();
                    }}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-emerald-500 text-black hover:bg-emerald-400 transition-colors duration-300"
                  >
                    Konfirmasi Pembayaran
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
