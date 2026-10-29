// // import React from 'react';
// import { House, LayoutDashboard, UserGroup, SlidersHorizontal } from 'lucide-react'

// export default function Samping() {
//     return (
//         <div className="flex h-screen bg-slate-100">
//             {/* Sidebar */}
//             <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col">
//                 <h2 className="text-xl font-bold mb-8">Creator Content</h2>
//                 <nav className="flex flex-col gap-4">
//                     <a href="/Dasbor" className="flex items-center gap-2 bg-slate-800 p-2 rounded">
//                         <House size={20} /> Halaman Utama
//                     </a>
//                     <a href="/alur_konten" className="flex items-center gap-2 bg-slate-800 p-2 rounded">
//                         <LayoutDashboard size={20} /> Alur konten
//                     </a>
//                     <a href="/saluran" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
//                         <UserGroup size={20} /> Saluran
//                     </a>
//                     <a href="/analitik" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
//                         <SlidersHorizontal size={20} /> Analitik
//                     </a>
//                 </nav>
//             </aside> 
//             </div>
//     )
// }

// import React from 'react';
import { House, LayoutDashboard, UserGroup, SlidersHorizontal } from 'lucide-react';

export default function Samping() {
    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white dark:bg-slate-900 dark:border-r dark:border-slate-800 p-5 flex flex-col">
                <h2 className="text-xl font-bold mb-8 text-white">Creator Content</h2>
                <nav className="flex flex-col gap-2">
                    <a href="/Dasbor" className="flex items-center gap-2 bg-slate-800 p-2.5 rounded-xl text-white font-medium">
                        <House size={20} /> Halaman Utama
                    </a>
                    <a href="/Alur_konten" className="flex items-center gap-2 p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition">
                        <LayoutDashboard size={20} /> Alur konten
                    </a>
                    <a href="/saluran" className="flex items-center gap-2 p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition">
                        <UserGroup size={20} /> Saluran
                    </a>
                    <a href="/analitik" className="flex items-center gap-2 p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition">
                        <SlidersHorizontal size={20} /> Analitik
                    </a>
                </nav>
            </aside>
        </div>
    );
}