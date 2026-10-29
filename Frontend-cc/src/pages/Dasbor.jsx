import { useState } from "react";
import {
    Sparkles,
    TrendingUp,
    Users,
    Video,
    CheckCircle2,
    ArrowUpRight,
    Plus,
    Radio,
    ExternalLink,
} from "lucide-react";

const formatNumber = (number = 0) =>
    new Intl.NumberFormat("id-ID").format(number);

export default function Dasbor() {
    // Contoh data ringkasan dasbor
    const [stats] = useState({
        totalViews: 245800,
        viewsChange: 12.4,
        totalFollowers: 45200,
        followersChange: 5.8,
        activePipeline: 6,
        publishedThisMonth: 14,
    });

    const [recentContents] = useState([
        {
            id: 1,
            title: "Tips Produktif Content Creator Pemula di 2026",
            format: "Long Video",
            platform: "YouTube",
            status: "Editing",
            date: "2026-06-10",
        },
        {
            id: 2,
            title: "Behind The Scenes Setup Studio Minimalis",
            format: "Short Video",
            platform: "TikTok",
            status: "Recording",
            date: "2026-06-12",
        },
        {
            id: 3,
            title: "Kesalahan Fatal Saat Mengelola Personal Branding",
            format: "Carousel",
            platform: "Instagram",
            status: "Ready",
            date: "2026-06-15",
        },
    ]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 text-slate-800 dark:text-slate-100 sm:p-6 lg:p-8 transition-colors duration-300">
            {/* Background Decorative Circles (Pink & Blue Soft Blur) */}
            <div className="bg-pink-400/20 dark:bg-pink-900/10 pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[140px]" />
            <div className="bg-blue-400/20 dark:bg-blue-900/10 pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-[140px]" />

            <div className="relative z-10">
                {/* Header / Welcome Banner */}
                <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/60 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-3">
                            <Sparkles size={14} /> Creator Dashboard
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
                            Halo, Creator 👋
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Semua performa konten dan pipeline produksi Anda tersaji rapi di sini.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/alur-konten"
                            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
                        >
                            <Plus size={18} />
                            Buat Konten Baru
                        </a>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {/* Card 1 */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Tayangan</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                                <Video size={20} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {formatNumber(stats.totalViews)}
                        </h2>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={14} /> +{stats.viewsChange}% dari bulan lalu
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Pengikut</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                                <Users size={20} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {formatNumber(stats.totalFollowers)}
                        </h2>
                        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight size={14} /> +{stats.followersChange}% pertumbuhan baru
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Pipeline Aktif</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                                <Radio size={20} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {stats.activePipeline}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">Konten dalam proses produksi</p>
                    </div>

                    {/* Card 4 */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Tayang Bulan Ini</p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle2 size={20} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {stats.publishedThisMonth}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">Postingan sukses dipublikasi</p>
                    </div>
                </div>

                {/* Recent Pipeline Section */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-sm">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 dark:border-slate-800 p-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                                Aktivitas & Pipeline Terbaru
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Status pengerjaan konten Anda saat ini.
                            </p>
                        </div>
                        <a
                            href="/alur-konten"
                            className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline"
                        >
                            Lihat Semua Pipeline →
                        </a>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {recentContents.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/10 to-blue-500/10 text-pink-600 dark:text-pink-400 font-bold text-xs">
                                        {item.platform[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                            {item.title}
                                        </h3>
                                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                            {item.platform} • {item.format} • Dijadwalkan: {item.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="rounded-full bg-pink-50 dark:bg-pink-950/50 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-900/40">
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}