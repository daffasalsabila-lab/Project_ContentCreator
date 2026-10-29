import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const formatNumber = (number) =>
  new Intl.NumberFormat("id-ID").format(number ?? 0);

const formatPercent = (number) => {
  if (number == null || !Number.isFinite(number)) return "—";

  return `${number > 0 ? "+" : ""}${number.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  })}%`;
};

const calculateChange = (current, previous) => {
  if (current == null || previous == null) return null;
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
};

const emptyData = {
  summary: null,
  monthlyData: [],
  platforms: [],
  popularContent: [],
  targets: null,
};

const API_URL = "/api/analytics";

export default function Analitik() {
  const [period, setPeriod] = useState("6 bulan");
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnalytics() {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}?period=${encodeURIComponent(period)}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error(`Gagal mengambil data analitik (${response.status}).`);
        }

        const result = await response.json();

        setData({
          summary: result.summary ?? null,
          monthlyData: result.monthlyData ?? [],
          platforms: result.platforms ?? [],
          popularContent: result.popularContent ?? [],
          targets: result.targets ?? null,
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        setData(emptyData);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAnalytics();
    return () => controller.abort();
  }, [period]);

  const summary = data.summary;

  const stats = [
    {
      title: "Total Tayangan",
      value: summary?.views?.current,
      previous: summary?.views?.previous,
      icon: Eye,
      color: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Pengikut",
      value: summary?.followers?.current,
      previous: summary?.followers?.previous,
      icon: Users,
      color: "bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400",
    },
    {
      title: "Engagement",
      value: summary?.engagement?.current,
      previous: summary?.engagement?.previous,
      icon: Heart,
      color: "bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
      isPercentage: true,
    },
    {
      title: "Total Interaksi",
      value: summary?.interactions?.current,
      previous: summary?.interactions?.previous,
      icon: MessageCircle,
      color: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    },
  ].map((stat) => ({
    ...stat,
    change: calculateChange(stat.value, stat.previous),
  }));

  const monthlyData = data.monthlyData;
  const maxValue = Math.max(
    0,
    ...monthlyData.flatMap((item) => [
      Number(item.views) || 0,
      Number(item.engagement) || 0,
    ])
  );

  const getBarHeight = (value) => {
    if (!maxValue || !Number.isFinite(Number(value))) return 0;
    return Math.min(100, Math.max(0, (Number(value) / maxValue) * 100));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 text-slate-800 dark:text-slate-100 sm:p-6 lg:p-8 transition-colors duration-300">
      {/* Background Decorative Circles */}
      <div className="bg-pink-400/20 dark:bg-pink-900/10 pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[140px]" />
      <div className="bg-blue-400/20 dark:bg-blue-900/10 pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-[140px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/60 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-3">
              <Sparkles size={14} /> Performance Analytics
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
              Analitik & Performa
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Pantau perkembangan dan performa kontenmu secara detail.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2">
            <CalendarDays size={18} className="text-slate-500 dark:text-slate-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent text-sm font-medium outline-none text-slate-800 dark:text-slate-100"
            >
              <option value="30 hari" className="bg-white dark:bg-slate-800">30 hari</option>
              <option value="3 bulan" className="bg-white dark:bg-slate-800">3 bulan</option>
              <option value="6 bulan" className="bg-white dark:bg-slate-800">6 bulan</option>
              <option value="12 bulan" className="bg-white dark:bg-slate-800">12 bulan</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4 text-sm text-slate-500 dark:text-slate-400 backdrop-blur-sm">
            <RefreshCw size={18} className="animate-spin text-pink-500" />
            Memuat data analitik...
          </div>
        )}

        {/* Statistik Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const hasChange = stat.change !== null;
            const positive = hasChange && stat.change >= 0;
            const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                    <Icon size={21} />
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-semibold ${!hasChange
                        ? "text-slate-400"
                        : positive
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500 dark:text-red-400"
                      }`}
                  >
                    {hasChange && <ChangeIcon size={15} />}
                    {formatPercent(stat.change)}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{stat.title}</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {stat.value == null
                    ? "—"
                    : stat.isPercentage
                      ? `${Number(stat.value).toLocaleString("id-ID", { maximumFractionDigits: 2 })}%`
                      : formatNumber(stat.value)}
                </h2>
                <p className="mt-2 text-xs text-slate-400">Dibandingkan periode sebelumnya</p>
              </div>
            );
          })}
        </div>

        {/* Grafik & Target */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 sm:p-6 xl:col-span-2 shadow-sm backdrop-blur-sm">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Performa Konten</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Perbandingan tayangan dan engagement.
                </p>
              </div>

              <div className="flex gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-500" /> Tayangan
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Engagement
                </span>
              </div>
            </div>

            {monthlyData.length === 0 ? (
              <div className="flex h-56 items-center justify-center text-sm text-slate-400">
                Belum ada data grafik.
              </div>
            ) : (
              <div className="flex h-56 items-end justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 sm:gap-4">
                {monthlyData.map((item, index) => (
                  <div
                    key={`${item.month}-${index}`}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1 overflow-hidden sm:gap-2">
                      <div
                        title={`Tayangan: ${formatNumber(item.views)}`}
                        style={{ height: `${getBarHeight(item.views)}%` }}
                        className="w-3 max-w-6 rounded-t-md bg-pink-500 transition-all sm:w-6"
                      />
                      <div
                        title={`Engagement: ${formatNumber(item.engagement)}`}
                        style={{ height: `${getBarHeight(item.engagement)}%` }}
                        className="w-3 max-w-6 rounded-t-md bg-blue-500 transition-all sm:w-6"
                      />
                    </div>
                    <span className="mt-3 text-xs text-slate-500 dark:text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 sm:p-6 shadow-sm backdrop-blur-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">Ringkasan Performa</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Progres target kreator.</p>

            <div className="mt-6 space-y-6">
              {[
                { label: "Target tayangan", value: data.targets?.views, color: "bg-pink-500" },
                { label: "Target pengikut", value: data.targets?.followers, color: "bg-blue-500" },
                { label: "Target engagement", value: data.targets?.engagement, color: "bg-purple-500" },
              ].map((target) => {
                const val = target.value;
                const valid = typeof val === "number" && Number.isFinite(val);
                const pct = valid ? Math.min(100, Math.max(0, val)) : 0;

                return (
                  <div key={target.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{target.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {valid ? `${val}%` : "—"}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className={`h-full rounded-full ${target.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-2xl bg-gradient-to-br from-pink-500/10 to-blue-500/10 p-4 border border-pink-200/30 dark:border-slate-800">
              <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <TrendingUp size={18} />
                <span className="text-sm font-semibold">Ringkasan Aktivitas</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                Performa akan terus diperbarui berdasarkan statistik postingan terbaru dari backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}