import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Kanban,
  Radio,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";

import ThemeToggle from "../../components/ThemeToggle";

// Daftar menu navigasi
const navItems = [
  {
    name: "Dasbor",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Alur Konten",
    path: "/alur-konten",
    icon: Kanban,
  },
  {
    name: "Saluran",
    path: "/saluran",
    icon: Radio,
  },
  {
    name: "Analitik",
    path: "/analitik",
    icon: BarChart3,
  },
];

export default function MainLayout() {
  const location = useLocation();

  // Mengecek halaman yang sedang aktif
  const isActive = (path) => {
    return path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-pink-400/20 blur-[140px] dark:bg-pink-900/10" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-[140px] dark:bg-blue-900/10" />

      <div className="relative z-10 flex min-h-screen flex-col md:flex-row">

        {/* SIDEBAR */}
        <aside className="flex w-full shrink-0 flex-col border-b border-slate-200/80 bg-white/80 p-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/85 sm:p-6 md:min-h-screen md:w-64 md:border-b-0 md:border-r">

          {/* Logo */}
          <Link to="/" className="mb-6 flex items-center gap-3 px-2 md:mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-blue-600 text-white shadow-sm">
              <Sparkles size={20} />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Content Creator
            </span>
          </Link>

          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-2 md:flex md:flex-1 md:flex-col">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition sm:px-4 ${active
                      ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100"
                    }`}
                >
                  <Icon size={19} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800 md:mt-auto md:pt-6">
            <Link
              to="/login"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40 sm:px-4"
            >
              <LogOut size={19} />
              <span>Keluar</span>
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1">

          {/* TOP HEADER */}
          <header className="flex items-center justify-end border-b border-slate-200/70 bg-white/50 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/40 sm:px-6 lg:px-8">
            <ThemeToggle />
          </header>

          {/* PAGE CONTENT */}
          <div className="min-w-0">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
}