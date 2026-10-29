import { Link, useLocation } from "react-router-dom";
import { House, LayoutDashboard, Users, SlidersHorizontal } from "lucide-react";

export default function Samping() {
    const location = useLocation();

    const navItems = [
        { name: "Halaman Utama", path: "/", icon: House }, // Disesuaikan ke "/" agar sesuai dengan rute utama/Dasbor
        { name: "Alur Konten", path: "/alur-konten", icon: LayoutDashboard },
        { name: "Saluran", path: "/saluran", icon: Users },
        { name: "Analitik", path: "/analitik", icon: SlidersHorizontal },
    ];

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white dark:bg-slate-900 dark:border-r dark:border-slate-800 p-5 flex flex-col">
                <h2 className="text-xl font-bold mb-8 text-white">Content Creator</h2>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 p-2.5 rounded-xl font-medium transition ${isActive
                                    ? "bg-slate-800 text-white shadow-sm"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
}