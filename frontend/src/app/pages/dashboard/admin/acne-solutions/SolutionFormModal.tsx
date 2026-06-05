"use client";

import { useState, useEffect } from "react";
import { useCreateAcneSolutionMutation, useUpdateAcneSolutionMutation } from "@/features/admin/api/admin.api";

interface SolutionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingData: any;
}

export default function SolutionFormModal({ isOpen, onClose, editingData }: SolutionFormModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    goodIngredients: [] as string[],
    badIngredients: [] as string[],
    habits: [] as string[],
    treatments: [] as { name: string; time: string }[],
  });

  const [inputs, setInputs] = useState({
    goodIngredient: "",
    badIngredient: "",
    habit: "",
    treatmentName: "",
    treatmentTime: "",
  });

  const createMutation = useCreateAcneSolutionMutation();
  const updateMutation = useUpdateAcneSolutionMutation();

  useEffect(() => {
    if (editingData) {
      setFormData({
        type: editingData.type || "",
        description: editingData.description || "",
        goodIngredients: (editingData.goodIngredient || editingData.goodIngredients || []).map((i: any) => typeof i === "string" ? i : i.name),
        badIngredients: (editingData.badIngredient || editingData.badIngredients || []).map((i: any) => typeof i === "string" ? i : i.name),
        habits: (editingData.habits || []).map((i: any) => typeof i === "string" ? i : i.name),
        treatments: (editingData.treatments || []).map((t: any) => ({ name: t.name, time: t.time })),
      });
    } else {
      setFormData({
        type: "",
        description: "",
        goodIngredients: [],
        badIngredients: [],
        habits: [],
        treatments: [],
      });
    }
    setInputs({ goodIngredient: "", badIngredient: "", habit: "", treatmentName: "", treatmentTime: "" });
  }, [editingData, isOpen]);

  if (!isOpen) return null;

  const handleAddItem = (listName: "goodIngredients" | "badIngredients" | "habits", inputValue: string, stateKey: string) => {
    if (inputValue.trim() === "") return;
    setFormData(prev => ({ ...prev, [listName]: [...prev[listName], inputValue.trim()] }));
    setInputs(prev => ({ ...prev, [stateKey]: "" }));
  };

  const handleRemoveItem = (listName: "goodIngredients" | "badIngredients" | "habits", index: number) => {
    setFormData(prev => ({ ...prev, [listName]: prev[listName].filter((_, i) => i !== index) }));
  };

  const handleAddTreatment = () => {
    if (inputs.treatmentName.trim() === "" || inputs.treatmentTime.trim() === "") return;
    setFormData(prev => ({
      ...prev,
      treatments: [...prev.treatments, { name: inputs.treatmentName.trim(), time: inputs.treatmentTime.trim() }]
    }));
    setInputs(prev => ({ ...prev, treatmentName: "", treatmentTime: "" }));
  };

  const handleRemoveTreatment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      treatments: prev.treatments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingData) {
      updateMutation.mutate({ id: editingData.id, data: formData }, {
        onSuccess: () => onClose()
      });
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => onClose()
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-sidebar-border)] rounded-3xl w-full max-w-3xl my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-bg)]">
          <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] tracking-tight">
            {editingData ? "Edit Acne Solution" : "Tambah Acne Solution Baru"}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-variant hover:bg-surface-variant/80 flex items-center justify-center text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 no-scrollbar">
          <form id="solutionForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Tipe Jerawat</label>
                {editingData ? (
                  <input
                    type="text"
                    readOnly
                    value={formData.type}
                    className="w-full bg-surface-variant border border-[var(--dashboard-border)] rounded-xl py-3 px-4 text-sm text-on-surface-variant cursor-not-allowed outline-none"
                  />
                ) : (
                  <div className="relative">
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl py-3 px-4 text-sm text-[var(--dashboard-text)] outline-none focus:border-primary transition-colors appearance-none"
                    >
                      <option value="" disabled>Pilih Tipe Jerawat...</option>
                      <option value="cyst">Cyst</option>
                      <option value="papules">Papules</option>
                      <option value="pustules">Pustules</option>
                      <option value="blackhead">Blackhead</option>
                      <option value="whitehead">Whitehead</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Deskripsi Singkat</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi..."
                  className="w-full bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl py-3 px-4 text-sm text-[var(--dashboard-text)] placeholder-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <hr className="border-[var(--dashboard-border)]" />

            {/* List Inputs Generic Component */}
            {[
              { title: "Bahan Skincare Baik (Good Ingredients)", stateList: formData.goodIngredients, listName: "goodIngredients", inputState: inputs.goodIngredient, inputKey: "goodIngredient", placeholder: "e.g. Salicylic Acid", color: "emerald" },
              { title: "Bahan Skincare Buruk (Bad Ingredients)", stateList: formData.badIngredients, listName: "badIngredients", inputState: inputs.badIngredient, inputKey: "badIngredient", placeholder: "e.g. Coconut Oil", color: "rose" },
              { title: "Kebiasaan Disarankan (Habits)", stateList: formData.habits, listName: "habits", inputState: inputs.habit, inputKey: "habit", placeholder: "e.g. Cuci muka 2x sehari", color: "blue" },
            ].map((section) => (
              <div key={section.listName}>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">{section.title}</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={section.inputState}
                    onChange={(e) => setInputs({ ...inputs, [section.inputKey]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddItem(section.listName as any, section.inputState, section.inputKey))}
                    placeholder={section.placeholder}
                    className="flex-1 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl py-2.5 px-4 text-sm text-[var(--dashboard-text)] outline-none focus:border-primary transition-colors"
                  />
                  <button type="button" onClick={() => handleAddItem(section.listName as any, section.inputState, section.inputKey)} className="bg-surface-variant text-on-surface px-4 rounded-xl hover:bg-surface-variant/80 transition-colors font-bold text-sm">
                    Tambah
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.stateList.map((item, i) => (
                    <span key={i} className={`inline-flex items-center gap-1 px-3 py-1 bg-${section.color}-100 dark:bg-${section.color}-900/30 text-${section.color}-700 dark:text-${section.color}-400 rounded-lg text-xs font-bold`}>
                      {item}
                      <button type="button" onClick={() => handleRemoveItem(section.listName as any, i)} className="hover:text-red-500 rounded-full flex items-center justify-center p-0.5 ml-1"><span className="material-symbols-outlined text-[14px]">close</span></button>
                    </span>
                  ))}
                  {section.stateList.length === 0 && <span className="text-xs text-on-surface-variant/50 font-medium italic">Belum ada item ditambahkan.</span>}
                </div>
              </div>
            ))}

            <hr className="border-[var(--dashboard-border)]" />

            {/* Treatments Input */}
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Tindakan Khusus (Treatments)</label>
              <div className="flex flex-col md:flex-row gap-2 mb-3">
                <input
                  type="text"
                  value={inputs.treatmentName}
                  onChange={(e) => setInputs({ ...inputs, treatmentName: e.target.value })}
                  placeholder="Nama Treatment (e.g. Kompres ES)"
                  className="flex-1 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl py-2.5 px-4 text-sm text-[var(--dashboard-text)] outline-none focus:border-primary transition-colors"
                />
                <input
                  type="text"
                  value={inputs.treatmentTime}
                  onChange={(e) => setInputs({ ...inputs, treatmentTime: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTreatment())}
                  placeholder="Waktu (e.g. 15 menit, pagi hari)"
                  className="flex-1 bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] rounded-xl py-2.5 px-4 text-sm text-[var(--dashboard-text)] outline-none focus:border-primary transition-colors"
                />
                <button type="button" onClick={handleAddTreatment} className="bg-surface-variant text-on-surface px-4 py-2.5 rounded-xl hover:bg-surface-variant/80 transition-colors font-bold text-sm">
                  Tambah
                </button>
              </div>
              <div className="space-y-2">
                {formData.treatments.map((treatment, i) => (
                  <div key={i} className="flex justify-between items-center bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] p-3 rounded-xl">
                    <div>
                      <h4 className="font-bold text-sm text-[var(--dashboard-text)]">{treatment.name}</h4>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5"><span className="material-symbols-outlined text-[12px]">schedule</span> {treatment.time}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveTreatment(i)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
                {formData.treatments.length === 0 && <span className="text-xs text-on-surface-variant/50 font-medium italic">Belum ada treatment ditambahkan.</span>}
              </div>
            </div>

          </form>
        </div>

        <div className="p-6 border-t border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isPending} className="px-6 py-2.5 rounded-xl font-bold bg-surface-variant text-on-surface hover:bg-surface-variant/80 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button type="submit" form="solutionForm" disabled={isPending} className="px-6 py-2.5 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
            {isPending && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            {editingData ? "Simpan Perubahan" : "Simpan Data Baru"}
          </button>
        </div>

      </div>
    </div>
  );
}
