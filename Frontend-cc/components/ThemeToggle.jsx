
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    // Mengambil tema yang pernah disimpan
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    // Mengatur tema pada seluruh halaman
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );
    }, [isDark]);

    // Mengganti tema
    const toggleTheme = () => {
        setIsDark((current) => !current);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Ganti ke Mode ${isDark ? "Terang" : "Gelap"}`}
            aria-pressed={isDark}
            title={`Ganti ke Mode ${isDark ? "Terang" : "Gelap"}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
            {isDark ? (
                <Sun size={20} className="text-amber-400" />
            ) : (
                <Moon size={20} />
            )}
        </button>
    );
}
