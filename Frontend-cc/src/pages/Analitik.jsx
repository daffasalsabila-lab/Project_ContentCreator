
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
} from "lucide-react";

// Format angka Indonesia
const formatNumber = (number) =>
  new Intl.NumberFormat("id-ID").format(number ?? 0);

const formatPercent = (number) => {
  if (number == null || !Number.isFinite(number)) return "—";

  return `${number > 0 ? "+" : ""}${number.toLocaleString("id-ID", {
    maximumFractionDigits: 2,
  })}%`;
};

// Hitung perubahan dibandingkan periode sebelumnya
const calculateChange = (current, previous) => {
  if (current == null || previous == null) return null;

  if (previous === 0) {
    return current === 0 ? 0 : null;
  }

  return ((current - previous) / previous) * 100;
};

// Data API yang akan diterima frontend
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
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnalytics() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}?period=${encodeURIComponent(period)}`,
          {
            signal: controller.signal,
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Gagal mengambil data analitik (${response.status}).`
          );
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

        setError(err.message || "Terjadi kesalahan saat mengambil data.");
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

  // Ringkasan statistik dari respons backend.
  // current = 7 hari terakhir, previous = 7 hari sebelumnya.
  const stats = [
    {
      title: "Total Tayangan",
      value: summary?.views?.current,
      previous: summary?.views?.previous,
      icon: Eye,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Pengikut",
      value: summary?.followers?.current,
      previous: summary?.followers?.previous,
      icon: Users,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Engagement",
      value: summary?.engagement?.current,
      previous: summary?.engagement?.previous,
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      isPercentage: true,
    },
    {
      title: "Total Interaksi",
      value: summary?.interactions?.current,
      previous: summary?.interactions?.previous,
      icon: MessageCircle,
      color: "bg-amber-100 text-amber-600",
    },
  ].map((stat) => ({
    ...stat,
    change: calculateChange(stat.value, stat.previous),
  }));

  // Normalisasi tinggi batang berdasarkan nilai terbesar.
  // Nilai tayangan dan engagement memakai skala yang sama
  // agar tinggi batang selalu berada dalam rentang 0–100%.
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

    return Math.min(
      100,
      Math.max(0, (Number(value) / maxValue) * 100)
    );
  };

  const hasData =
    summary !== null ||
    monthlyData.length > 0 ||
    data.platforms.length > 0 ||
    data.popularContent.length > 0;

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-violet-600">
            Laporan Performa
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Analitik
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pantau perkembangan dan performa kontenmu.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <CalendarDays size={18} className="text-slate-500" />

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-sm font-medium outline-none"
            aria-label="Pilih periode analitik"
          >
            <option value="30 hari">30 hari</option>
            <option value="3 bulan">3 bulan</option>
            <option value="6 bulan">6 bulan</option>
            <option value="12 bulan">12 bulan</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          <RefreshCw size={18} className="animate-spin" />
          Memuat data analitik...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <p className="font-semibold">
            Data analitik belum dapat dimuat.
          </p>
          <p className="mt-1">{error}</p>
          <p className="mt-2">
            Pastikan backend dan endpoint API sudah tersedia.
          </p>
        </div>
      )}

      {/* Data kosong */}
      {!loading && !error && !hasData && (
        <div className="mb-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <Eye size={32} className="mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700">
            Belum ada data analitik
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Data akan ditampilkan setelah tersedia dari backend.
          </p>
        </div>
      )}

      {/* Statistik */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const hasChange = stat.change !== null;
          const positive = hasChange && stat.change >= 0;
          const ChangeIcon = positive ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={21} />
                </div>

                <span
                  title="Perubahan dibandingkan 7 hari sebelumnya"
                  className={`flex items-center gap-1 text-xs font-semibold ${!hasChange
                      ? "text-slate-400"
                      : positive
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                >
                  {hasChange && <ChangeIcon size={15} />}
                  {formatPercent(stat.change)}
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {stat.title}
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                {stat.value == null
                  ? "—"
                  : stat.isPercentage
                    ? `${Number(stat.value).toLocaleString("id-ID", {
                      maximumFractionDigits: 2,
                    })}%`
                    : formatNumber(stat.value)}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Dibandingkan 7 hari sebelumnya
              </p>
            </div>
          );
        })}
      </div>

      {/* Grafik dan Ringkasan */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold">
                Performa Konten
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Perbandingan tayangan dan engagement.
              </p>
            </div>

            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                Tayangan
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Engagement
              </span>
            </div>
          </div>

          {monthlyData.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-sm text-slate-400">
              Belum ada data grafik.
            </div>
          ) : (
            <div className="flex h-56 items-end justify-between gap-2 border-b border-slate-100 pb-2 sm:gap-4">
              {monthlyData.map((item, index) => (
                <div
                  key={`${item.month}-${index}`}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1 overflow-hidden sm:gap-2">
                    <div
                      title={`Tayangan: ${formatNumber(item.views)}`}
                      style={{
                        height: `${getBarHeight(item.views)}%`,
                      }}
                      className="w-3 max-w-6 rounded-t-md bg-violet-500 transition-all sm:w-6"
                    />

                    <div
                      title={`Engagement: ${formatNumber(item.engagement)}`}
                      style={{
                        height: `${getBarHeight(item.engagement)}%`,
                      }}
                      className="w-3 max-w-6 rounded-t-md bg-cyan-400 transition-all sm:w-6"
                    />
                  </div>

                  <span className="mt-3 text-xs text-slate-500">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 text-xs text-slate-400">
            Tinggi batang dinormalisasi terhadap nilai tertinggi.
          </p>
        </div>

        {/* Ringkasan Target */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Ringkasan Performa
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Progres target dari data backend.
          </p>

          <div className="mt-6 space-y-6">
            {[
              {
                label: "Target tayangan",
                value: data.targets?.views,
                color: "bg-violet-500",
              },
              {
                label: "Target pengikut",
                value: data.targets?.followers,
                color: "bg-cyan-500",
              },
              {
                label: "Target engagement",
                value: data.targets?.engagement,
                color: "bg-emerald-500",
              },
            ].map((target) => {
              const value = target.value;
              const valid =
                typeof value === "number" &&
                Number.isFinite(value);

              const percentage = valid
                ? Math.min(100, Math.max(0, value))
                : 0;

              return (
                <div key={target.label}>
                  <div className="mb-2 flex justify-between gap-2 text-sm">
                    <span className="text-slate-600">
                      {target.label}
                    </span>
                    <span className="font-semibold">
                      {valid ? `${value}%` : "—"}
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label={target.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={percentage}
                  >
                    <div
                      className={`h-full rounded-full ${target.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-xl bg-violet-50 p-4">
            <div className="flex items-center gap-2 text-violet-700">
              <TrendingUp size={18} />
              <span className="text-sm font-semibold">
                Ringkasan aktivitas
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-violet-600">
              Performa akan diringkas berdasarkan data yang
              tersedia dari backend.
            </p>
          </div>
        </div>
      </div>

      {/* Performa Platform */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Performa per Platform
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Perbandingan jumlah pengikut di setiap platform.
          </p>
        </div>

        {data.platforms.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            Belum ada data platform.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {data.platforms.map((platform) => {
              const growth = calculateChange(
                platform.followers?.current,
                platform.followers?.previous
              );

              const positive = growth !== null && growth >= 0;

              return (
                <div
                  key={platform.id ?? platform.name}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Users size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">
                        {platform.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {platform.followers?.current == null
                          ? "—"
                          : `${formatNumber(
                            platform.followers.current
                          )} pengikut`}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-semibold ${growth === null
                          ? "text-slate-400"
                          : positive
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                    >
                      {formatPercent(growth)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    Perubahan pengikut dalam 7 hari.
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Konten Terpopuler */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Konten Terpopuler
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Konten dengan performa terbaik.
          </p>
        </div>

        {data.popularContent.length === 0 ? (
          <div className="border-t border-slate-100 p-8 text-center text-sm text-slate-400">
            Belum ada data konten.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-650px text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Nama Konten
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Platform
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Tayangan
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Likes
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Komentar
                  </th>
                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {data.popularContent.map((content) => (
                  <tr
                    key={content.id ?? content.title}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {content.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {content.platform}
                    </td>
                    <td className="px-6 py-4">
                      {formatNumber(content.views)}
                    </td>
                    <td className="px-6 py-4">
                      {formatNumber(content.likes)}
                    </td>
                    <td className="px-6 py-4">
                      {formatNumber(content.comments)}
                    </td>
                    <td className="px-6 py-4">
                      {content.status ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {content.status}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          Menampilkan {formatNumber(data.popularContent.length)} konten.
        </div>
      </div>
    </div>
  );
}
