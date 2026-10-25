
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Music2,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
} from "lucide-react";

const monthlyData = [
  { month: "Mei", views: 45, engagement: 28 },
  { month: "Jun", views: 60, engagement: 38 },
  { month: "Jul", views: 52, engagement: 32 },
  { month: "Agu", views: 75, engagement: 45 },
  { month: "Sep", views: 68, engagement: 40 },
  { month: "Okt", views: 1000, engagement: 58 },
];

const platformData = [
  {
    name: "Instagram",
    icon: Music2,
    followers: "12.500",
    growth: "+12,5%",
    color: "bg-pink-100 text-pink-600",
    bar: "bg-pink-500",
    width: "85%",
  },
  {
    name: "YouTube",
    icon: Music2,
    followers: "8.200",
    growth: "+8,2%",
    color: "bg-red-100 text-red-600",
    bar: "bg-red-500",
    width: "65%",
  },
  {
    name: "Facebook",
    icon: Music2,
    followers: "5.600",
    growth: "+5,4%",
    color: "bg-blue-100 text-blue-600",
    bar: "bg-blue-500",
    width: "45%",
  },
  {
    name: "TikTok",
    icon: Music2,
    followers: "4.300",
    growth: "-1,2%",
    color: "bg-slate-200 text-slate-700",
    bar: "bg-slate-500",
    width: "35%",
  },
];

const popularContent = [
  {
    title: "Tips Meningkatkan Penjualan Online",
    platform: "Instagram",
    views: "24.500",
    likes: "2.340",
    comments: "186",
    status: "Terbaik",
  },
  {
    title: "Behind The Scene Produk Baru",
    platform: "YouTube",
    views: "18.200",
    likes: "1.520",
    comments: "124",
    status: "Bagus",
  },
  {
    title: "Promo Spesial Bulan Ini",
    platform: "Facebook",
    views: "12.800",
    likes: "980",
    comments: "76",
    status: "Bagus",
  },
];

const formatNumber = (number) =>
  new Intl.NumberFormat("id-ID").format(number);

export default function Analitik() {
  const [period, setPeriod] = useState("6 bulan");

  const stats = [
    {
      title: "Total Tayangan",
      value: "128.450",
      change: "+18,6%",
      positive: true,
      icon: Eye,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Pengikut",
      value: "30.600",
      change: "+12,4%",
      positive: true,
      icon: Users,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Engagement",
      value: "8,42%",
      change: "+2,1%",
      positive: true,
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total Interaksi",
      value: "6.280",
      change: "-1,2%",
      positive: false,
      icon: MessageCircle,
      color: "bg-amber-100 text-amber-600",
    },
  ];

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
          >
            <option>30 hari</option>
            <option>3 bulan</option>
            <option>6 bulan</option>
            <option>12 bulan</option>
          </select>
        </div>
      </div>

      {/* Statistik */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.positive
            ? ArrowUpRight
            : ArrowDownRight;

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
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    stat.positive ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  <ChangeIcon size={15} />
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                {stat.title}
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Grafik Performa */}
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

          <div className="flex h-56 items-end justify-between gap-2 border-b border-slate-100 pb-2 sm:gap-4">
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div className="flex h-full w-full items-end justify-center gap-1 sm:gap-2">
                  <div
                    title={`Tayangan: ${item.views}`}
                    style={{ height: `${item.views}%` }}
                    className="w-3 rounded-t-md bg-violet-500 transition-all sm:w-6"
                  />
                  <div
                    title={`Engagement: ${item.engagement}`}
                    style={{ height: `${item.engagement}%` }}
                    className="w-3 rounded-t-md bg-cyan-400 transition-all sm:w-6"
                  />
                </div>
                <span className="mt-3 text-xs text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Data grafik merupakan contoh untuk tampilan dashboard.
          </p>
        </div>

        {/* Ringkasan */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold">
            Ringkasan Performa
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Hasil aktivitas konten.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">Target tayangan</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[78%] rounded-full bg-violet-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">Target pengikut</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[65%] rounded-full bg-cyan-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">Target engagement</span>
                <span className="font-semibold">84%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[84%] rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-xl bg-violet-50 p-4">
            <div className="flex items-center gap-2 text-violet-700">
              <TrendingUp size={18} />
              <span className="text-sm font-semibold">
                Performa meningkat
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-violet-600">
              Tayangan konten menunjukkan tren positif dibandingkan periode sebelumnya.
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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {platformData.map((platform) => {
            const Icon = platform.icon;
            const isNegative = platform.growth.startsWith("-");

            return (
              <div
                key={platform.name}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${platform.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{platform.name}</p>
                    <p className="text-sm text-slate-500">
                      {platform.followers} pengikut
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      isNegative ? "text-red-500" : "text-emerald-600"
                    }`}
                  >
                    {platform.growth}
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${platform.bar}`}
                    style={{ width: platform.width }}
                  />
                </div>
              </div>
            );
          })}
        </div>
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Konten</th>
                <th className="px-6 py-4 font-semibold">Platform</th>
                <th className="px-6 py-4 font-semibold">Tayangan</th>
                <th className="px-6 py-4 font-semibold">Likes</th>
                <th className="px-6 py-4 font-semibold">Komentar</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {popularContent.map((content) => (
                <tr
                  key={content.title}
                  className="transition hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {content.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {content.platform}
                  </td>
                  <td className="px-6 py-4">
                    {content.views}
                  </td>
                  <td className="px-6 py-4">
                    {content.likes}
                  </td>
                  <td className="px-6 py-4">
                    {content.comments}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        content.status === "Terbaik"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {content.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          Menampilkan {formatNumber(popularContent.length)} konten terpopuler.
          Data yang ditampilkan masih berupa contoh.
        </div>
      </div>
    </div>
  );
}
