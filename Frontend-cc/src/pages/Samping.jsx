// import React from 'react';
import { LayoutDashboard, UserGroup, Settings } from 'lucide-react'

export default function Samping() {
    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col">
                <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    <a href="/Dasbor" className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                        <LayoutDashboard size={20} /> Dasbor
                    </a>
                    <a href="/alur_konten" className="flex items-center gap-2 bg-slate-800 p-2 rounded">
                        <LayoutDashboard size={20} /> Alur konten
                    </a>
                    <a href="/saluran" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
                        <UserGroup size={20} /> Saluran
                    </a>
                    <a href="/analitik" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
                        <Settings size={20} /> Analitik
                    </a>
                </nav>
            </aside> 
            </div>
    )
}