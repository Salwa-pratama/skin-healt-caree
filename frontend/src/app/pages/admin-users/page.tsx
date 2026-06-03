"use client";

import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "../dashboard/dashboard.css";
import { useAdminUsers, useDeleteUserMutation } from "@/features/admin/api/admin.api";
import { useProfile } from "@/features/auth/api/profile.api";

export default function AdminUsers() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: users, isLoading } = useAdminUsers();
  const deleteMutation = useDeleteUserMutation();
  const { data: currentUser } = useProfile();

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah kamu yakin ingin menghapus user ${name}?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] antialiased min-h-screen font-manrope transition-colors duration-300">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <Sidebar activePage="admin-users" isOpen={isSidebarOpen} />

      <main className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pt-20 px-4 sm:px-6 md:px-10 dashboard-animate-in ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
        <div className="max-w-7xl mx-auto flex flex-col pb-32 md:pb-8">
          
          <div className="bg-[var(--dashboard-card-bg)] rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[var(--dashboard-border)] transition-colors duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase text-[var(--dashboard-text)]">Manage Users</h1>
                <p className="text-sm font-medium text-on-surface-variant/70 mt-1">Kelola data seluruh akun terdaftar di aplikasi.</p>
              </div>
            </div>

            {isLoading ? (
              <div className="animate-pulse flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-[var(--dashboard-border)] rounded-xl"></div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--dashboard-border)]">
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">ID</th>
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">Name</th>
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">Email</th>
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70">Role</th>
                      <th className="py-4 px-4 text-xs font-black uppercase tracking-widest text-on-surface-variant/70 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user: any) => (
                      <tr key={user.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-bg)] transition-colors">
                        <td className="py-4 px-4 text-sm font-bold">#{user.id}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--dashboard-border)]">
                              <img src={user.avatar || (user.gender === "female" ? "/assets/profile/female.png" : "/assets/profile/male.png")} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-on-surface-variant">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-variant text-on-surface-variant'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            disabled={user.id === currentUser?.id || deleteMutation.isPending}
                            className={`p-2 rounded-xl transition-colors ${user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100 text-red-500'}`}
                            title={user.id === currentUser?.id ? "You cannot delete yourself" : "Delete User"}
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!users || users.length === 0) && (
                  <div className="text-center py-12 text-on-surface-variant font-medium">
                    Tidak ada data user.
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      <MobileNav activePage="admin-users" />
    </div>
  );
}
