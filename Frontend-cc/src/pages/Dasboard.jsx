import React from 'react';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col">
                <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    <a href="#" className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                        <LayoutDashboard size={20} /> Ringkasan
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
                        <Users size={20} /> Pengguna
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
                        <Settings size={20} /> Pengaturan
                    </a>
                </nav>
            </aside>

            {/* Konten Utama */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold">Selamat Datang Kembali</h1>
                    <div className="text-sm font-medium text-slate-600">Admin</div>
                </header>

                {/* Statistik / Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-slate-500 text-sm">Total Pendapatan</p>
                        <p className="text-2xl font-bold">Rp 45.500.000</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-slate-500 text-sm">Pengguna Baru</p>
                        <p className="text-2xl font-bold">+1,280</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow">
                        <p className="text-slate-500 text-sm">Pesanan Aktif</p>
                        <p className="text-2xl font-bold">342</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
