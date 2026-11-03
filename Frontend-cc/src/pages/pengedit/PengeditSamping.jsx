
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Kanban,
    Radio,
    BarChart3,
    LogOut,
    Sparkles,
    X,
    UserRound,
    AlertCircle,
} from "lucide-react";

const navItems = [
    { name: "Dasbor", path: "/pengedit/dashboard", icon: LayoutDashboard },
    { name: "Alur Konten", path: "/pengedit/alur-konten", icon: Kanban },
    // { name: "Analitik", path: "/analitik", icon: BarChart3 },
];

export default function PengeditSamping({
    isOpen,
    onClose,
    collapsed,

    // Data akun (nantinya dari backend)
    user = JSON.parse(localStorage.getItem("user")),

    // URL foto profil dari backend
    avatarUrl = null,

    // Callback logout untuk integrasi backend
    onLogout,
}) {
    const location = useLocation();
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const rawUser = localStorage.getItem('user')

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    // Membuka konfirmasi logout
    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    // Membatalkan logout
    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    // Konfirmasi logout
    const handleConfirmLogout = async () => {
        try {
            setIsLoggingOut(true);

            // Jika backend sudah tersedia, jalankan fungsi logout
            if (onLogout) {
                await onLogout();
            } else {
                // Sementara menggunakan navigasi frontend
                navigate("/login");
            }

            setShowLogoutModal(false);
            onClose?.();
        } catch (error) {
            console.error("Gagal keluar:", error);
            alert("Terjadi kesalahan saat keluar. Silakan coba lagi.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            {/* Overlay untuk tampilan HP */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Tutup sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-dvh flex-col border-r border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/95
          ${collapsed ? "md:w-20" : "md:w-64"}
          w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
            >
                {/* Logo dan tombol tutup HP */}
                <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-200/70 px-4 dark:border-slate-800">
                    <Link
                        to="/"
                        onClick={onClose}
                        className="flex min-w-0 items-center gap-3"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-blue-600 text-white">
                            <Sparkles size={20} />
                        </div>

                        {!collapsed && (
                            <span className="truncate text-lg font-bold text-slate-900 dark:text-white">
                                Content Creator
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup sidebar"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu navigasi */}
                <nav className="min-h-0 flex-1 overflow-y-auto p-3">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    title={collapsed ? item.name : undefined}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition
                    ${active
                                            ? "bg-gradient-to-r from-pink-500 to-blue-600 text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                                        }
                    ${collapsed ? "md:justify-center md:px-2" : ""}`}
                                >
                                    <Icon size={20} className="shrink-0" />
                                    {!collapsed && <span>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Profil akun dan tombol keluar */}
                <div className="shrink-0 border-t border-slate-200 p-3 dark:border-slate-800">

                    {/* Informasi akun */}
                    <div
                        className={`mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/70
              ${collapsed ? "md:justify-center md:p-2" : ""}`}
                    >
                        {/* Foto profil */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gradient-to-br from-pink-400 to-blue-500 shadow-sm dark:border-slate-700">
                            {avatarUrl || user?.avatarUrl ? (
                                <img
                                    src={avatarUrl || user.avatarUrl}
                                    alt="Foto profil pengguna"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserRound size={22} className="text-white" />
                            )}
                        </div>

                        {/* Nama dan email */}
                        {!collapsed && (
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                                    {user?.name || "Nama Pengguna"}
                                </p>
                                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                                    {user?.role || "Kreator"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tombol keluar */}
                    <button
                        type="button"
                        onClick={handleLogoutClick}
                        title={collapsed ? "Keluar" : undefined}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40
              ${collapsed ? "md:justify-center md:px-2" : ""}`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!collapsed && <span>Keluar</span>}
                    </button>
                </div>
            </aside>

            {/* Modal Konfirmasi Logout */}
            {showLogoutModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    onClick={handleCancelLogout}
                >
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="logout-title"
                        aria-describedby="logout-description"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
                    >
                        {/* Icon peringatan */}
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50">
                            <AlertCircle
                                size={30}
                                className="text-red-600 dark:text-red-400"
                            />
                        </div>

                        {/* Judul dan pesan */}
                        <div className="text-center">
                            <h2
                                id="logout-title"
                                className="text-xl font-bold text-slate-900 dark:text-white"
                            >
                                Konfirmasi Keluar
                            </h2>

                            <p
                                id="logout-description"
                                className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400"
                            >
                                Apakah kamu yakin ingin keluar dari akun ini?
                                Kamu harus masuk kembali untuk mengakses akunmu.
                            </p>
                        </div>

                        {/* Tombol aksi */}
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={handleCancelLogout}
                                disabled={isLoggingOut}
                                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={handleConfirmLogout}
                                disabled={isLoggingOut}
                                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoggingOut ? "Memproses..." : "Ya, Keluar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
