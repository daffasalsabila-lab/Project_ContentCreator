import { useState, useEffect } from "react";
import {
    Sparkles,
    Users,
    Video,
    CheckCircle2,
    ArrowUpRight,
    Plus,
    Radio,
} from "lucide-react";
import { Link } from "react-router-dom";

// Format angka Indonesia
const formatNumber = (number = 0) =>
    new Intl.NumberFormat("id-ID").format(number);

// Komponen kartu statistik
function StatCard({
    title,
    value,
    change,
    description,
    icon: Icon,
    color,
}) {
    const colors = {
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
        pink: "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400",
        purple:
            "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
        green:
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
    };

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {title}
                </p>

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}
                >
                    <Icon size={20} />
                </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                {value}
            </h2>

            {change !== undefined && change !== 0 ? (
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight size={14} />
                    +{change}% {description}
                </div>
            ) : (
                <p className="mt-2 text-xs text-slate-400">
                    {description}
                </p>
            )}
        </div>
    );
}

// Komponen status konten
function StatusBadge({ status }) {
    const statusColors = {
        Editing:
            "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900",
        Recording:
            "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-900",
        Ready:
            "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900",
    };

    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[status] ||
                "border-slate-200 bg-slate-50 text-slate-600"
                }`}
        >
            {status}
        </span>
    );
}

// Halaman utama Dasbor
export default function Dasbor() {
    // State data statistik (dimulai dari 0, tanpa dummy)
    const [stats, setStats] = useState({
        totalViews: 0,
        viewsChange: 0,
        totalFollowers: 0,
        followersChange: 0,
        activePipeline: 0,
        publishedThisMonth: 0,
    });

    // State aktivitas konten (dimulai dari array kosong)
    const [recentContents, setRecentContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tempat mengambil data dari API atau backend di masa mendatang
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Contoh jika nanti memanggil API:
                // const response = await fetch('/api/dashboard');
                // const data = await response.json();
                // setStats(data.stats);
                // setRecentContents(data.recentContents);

                // Karena belum ada backend, dibiarkan kosong/0
                setStats({
                    totalViews: 0,
                    viewsChange: 0,
                    totalFollowers: 0,
                    followersChange: 0,
                    activePipeline: 0,
                    publishedThisMonth: 0,
                });
                setRecentContents([]);
            } catch (error) {
                console.error("Gagal memuat data dasbor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="min-h-screen p-4 text-slate-800 transition-colors duration-300 dark:text-slate-100 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <section className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
                            <Sparkles size={14} />
                            Creator Dashboard
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
                            Halo, Creator 👋
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Semua performa konten dan pipeline produksi Anda tersaji rapi di sini.
                        </p>
                    </div>

                    <Link
                        to="/alur-konten"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Buat Konten Baru
                    </Link>
                </section>

                {/* STATISTIK */}
                <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Tayangan"
                        value={formatNumber(stats.totalViews)}
                        change={stats.viewsChange}
                        description="dari bulan lalu"
                        icon={Video}
                        color="blue"
                    />

                    <StatCard
                        title="Total Pengikut"
                        value={formatNumber(stats.totalFollowers)}
                        change={stats.followersChange}
                        description="pertumbuhan baru"
                        icon={Users}
                        color="pink"
                    />

                    <StatCard
                        title="Pipeline Aktif"
                        value={stats.activePipeline}
                        description="Konten dalam proses produksi"
                        icon={Radio}
                        color="purple"
                    />

                    <StatCard
                        title="Tayang Bulan Ini"
                        value={stats.publishedThisMonth}
                        description="Postingan sukses dipublikasi"
                        icon={CheckCircle2}
                        color="green"
                    />
                </section>

                {/* AKTIVITAS TERBARU */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">

                    {/* Section Header */}
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                                Aktivitas & Pipeline Terbaru
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Status pengerjaan konten Anda saat ini.
                            </p>
                        </div>

                        <Link
                            to="/alur-konten"
                            className="text-xs font-semibold text-pink-600 hover:underline dark:text-pink-400"
                        >
                            Lihat Semua Pipeline →
                        </Link>
                    </div>

                    {/* Content List / Empty State */}
                    {recentContents.length === 0 ? (
                        <div className="p-12 text-center">
                            <Radio
                                size={32}
                                className="mx-auto mb-3 text-slate-300 dark:text-slate-700"
                            />
                            <p className="font-semibold text-slate-700 dark:text-slate-300">
                                Belum ada aktivitas konten
                            </p>
                            <p className="mt-1 text-sm text-slate-400">
                                Mulai buat dan tambahkan konten melalui menu Alur Konten.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentContents.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/10 to-blue-500/10 text-xs font-bold text-pink-600 dark:text-pink-400">
                                            {item.platform ? item.platform[0] : "C"}
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {item.platform} • {item.format} • Dijadwalkan: {item.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={item.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </div>
    );
}