import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, PanelLeftClose, PanelLeft } from "lucide-react";

import Samping from "./Samping";
import ThemeToggle from "../../components/ThemeToggle";

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      { }
      <Samping
        isOpen={isOpen}
        onClose={closeSidebar}
        collapsed={collapsed}
      />

      {/* Area konten bergeser sesuai ukuran sidebar desktop */}
      <div
        className={`min-h-dvh transition-[margin] duration-300 ${collapsed ? "md:ml-20" : "md:ml-64"
          }`}
      >
        <header className="flex h-20 items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Tombol buka sidebar di HP */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Buka sidebar"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
            >
              <Menu size={22} />
            </button>

            {/* Tombol collapse/expand di desktop */}
            <button
              type="button"
              onClick={() => setCollapsed((value) => !value)}
              aria-label={collapsed ? "Perlebar sidebar" : "Perkecil sidebar"}
              className="hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:inline-flex"
            >
              {collapsed ? (
                <PanelLeft size={22} />
              ) : (
                <PanelLeftClose size={22} />
              )}
            </button>
          </div>

          <ThemeToggle />
        </header>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}