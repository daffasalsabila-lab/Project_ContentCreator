import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Lightbulb,
  LoaderCircle,
  Plus,
  Radio,
  Sparkles,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import contentService from "../services/contentService";

const stages = [
  { id: "idea", label: "Ide", color: "bg-violet-500", icon: Lightbulb },
  { id: "scripting", label: "Naskah", color: "bg-fuchsia-500", icon: Video },
  { id: "recording", label: "Produksi", color: "bg-blue-500", icon: Video },
  { id: "editing", label: "Editing", color: "bg-cyan-500", icon: Video },
  { id: "ready", label: "Siap tayang", color: "bg-emerald-500", icon: CheckCircle2 },
  { id: "published", label: "Terpublikasi", color: "bg-pink-500", icon: Radio },
];

const formatNumber = (value) => new Intl.NumberFormat("id-ID").format(value);

const getUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const getDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  const date = getDate(value);
  return date
    ? new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
    : "Belum dijadwalkan";
};

const statusLabels = Object.fromEntries(stages.map(({ id, label }) => [id, label]));

const statusStyles = {
  idea: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300",
  scripting: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-900 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
  recording: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300",
  editing: "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-300",
  ready: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",
  published: "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-900 dark:bg-pink-950/50 dark:text-pink-300",
};

function StatCard({ title, value, note, icon: Icon, tone }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {typeof value === "number" ? formatNumber(value) : value}
          </p>
        </div>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${tone}`}>
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status] ||
        "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        }`}
    >
      {statusLabels[status] || status || "Status tidak diketahui"}
    </span>
  );
}

export default function Dasbor() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useMemo(() => getUser(), []);

  useEffect(() => {
    let active = true;

    const fetchContents = async () => {
      try {
        const response = await contentService.getContents();
        const data = response?.data ?? response;
        if (!Array.isArray(data)) {
          throw new Error("Format data konten tidak valid.");
        }
        if (active) setContents(data);
      } catch (requestError) {
        if (active) {
          setError(
            requestError.response?.data?.message ||
            requestError.message ||
            "Gagal memuat data dashboard."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchContents();
    return () => {
      active = false;
    };
  }, []);

  const summary = useMemo(() => {
    const thisMonth = new Date();
    const publishedThisMonth = contents.filter((content) => {
      if (content.status !== "published") return false;
      const publishedDate = getDate(content.published_date);
      return (
        publishedDate &&
        publishedDate.getMonth() === thisMonth.getMonth() &&
        publishedDate.getFullYear() === thisMonth.getFullYear()
      );
    }).length;

    return {
      total: contents.length,
      inProduction: contents.filter((content) =>
        ["scripting", "recording", "editing"].includes(content.status)
      ).length,
      ready: contents.filter((content) => content.status === "ready").length,
      publishedThisMonth,
    };
  }, [contents]);

  const stageCounts = useMemo(
    () =>
      stages.map((stage) => ({
        ...stage,
        count: contents.filter((content) => content.status === stage.id).length,
      })),
    [contents]
  );

  const recentContents = useMemo(
    () =>
      [...contents]
        .sort((a, b) => {
          const dateA = getDate(a.updated_at || a.created_at)?.getTime() || Number(a.id) || 0;
          const dateB = getDate(b.updated_at || b.created_at)?.getTime() || Number(b.id) || 0;
          return dateB - dateA;
        })
        .slice(0, 5),
    [contents]
  );

  const upcomingContents = useMemo(
    () =>
      contents
        .filter((content) => content.status !== "published" && getDate(content.scheduled_date))
        .sort(
          (a, b) =>
            getDate(a.scheduled_date).getTime() - getDate(b.scheduled_date).getTime()
        )
        .slice(0, 4),
    [contents]
  );

  const firstName = user?.name?.trim().split(/\s+/)[0] || "Creator";
  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Selamat pagi" : hour < 15 ? "Selamat siang" : hour < 18 ? "Selamat sore" : "Selamat malam";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 p-4 text-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
      <div className="relative z-10 mx-auto max-w-7xl space-y-3">
        <header
          className="relative mb-7 overflow-hidden rounded-3xl bg-pink-600 p-6 text-white shadow-lg shadow-pink-900/10 sm:p-8 lg:p-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #db2777 0%, #c026d3 52%, #1d4ed8 100%)",
          }}
        >
          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
                <Sparkles size={14} />
                CREATOR WORKSPACE
              </span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {greeting}, {firstName}
                <span aria-hidden="true"> 👋</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                Satu tempat untuk merencanakan, memproduksi, dan memantau semua
                kontenmu. Lihat progres terbaru dan lanjutkan pekerjaan hari ini.
              </p>
            </div>
            <Link
              to="/alur-konten"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-pink-700 shadow-sm transition hover:bg-pink-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Plus size={18} />
              Buat Konten
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-white/20 pt-5 text-xs text-white/80">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} />
              {new Intl.DateTimeFormat("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </span>
            <span className="inline-flex items-center gap-2">
              <Radio size={15} />
              Ringkasan pipeline kontenmu
            </span>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            <CircleAlert size={18} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Dashboard belum dapat dimuat</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        <section
          aria-label="Ringkasan konten"
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            title="Total Konten"
            value={loading || error ? "—" : summary.total}
            note="Semua konten di pipeline"
            icon={Video}
            tone="bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400"
          />
          <StatCard
            title="Dalam Produksi"
            value={loading || error ? "—" : summary.inProduction}
            note="Naskah, produksi, dan editing"
            icon={Clock3}
            tone="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
          />
          <StatCard
            title="Siap Tayang"
            value={loading || error ? "—" : summary.ready}
            note="Menunggu jadwal publikasi"
            icon={CheckCircle2}
            tone="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
          />
          <StatCard
            title="Tayang Bulan Ini"
            value={loading || error ? "—" : summary.publishedThisMonth}
            note="Konten yang dipublikasikan bulan ini"
            icon={Radio}
            tone="bg-violet-50 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400"
          />
        </section>

        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 xl:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Progres Pipeline
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Sebaran konten berdasarkan tahap pengerjaan.
                </p>
              </div>
              <Link
                to="/alur-konten"
                className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400"
              >
                Kelola pipeline <ArrowRight size={15} />
              </Link>
            </div>

            {loading ? (
              <div className="flex h-40 items-center justify-center gap-2 text-sm text-slate-400">
                <LoaderCircle size={18} className="animate-spin" />
                Memuat progres...
              </div>
            ) : error ? (
              <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center text-sm text-slate-500 dark:border-slate-700">
                Data progres tidak tersedia saat ini.
              </div>
            ) : summary.total === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-4 text-center dark:border-slate-700">
                <Lightbulb size={26} className="mb-2 text-pink-400" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Pipeline masih kosong
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Tambahkan konten pertamamu untuk melihat progres di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stageCounts.map((stage) => {
                  const percentage = (stage.count / summary.total) * 100;
                  const StageIcon = stage.icon;
                  return (
                    <div key={stage.id}>
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
                          <StageIcon size={15} className="text-slate-400" />
                          {stage.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {stage.count} <span className="font-normal">konten</span>
                        </span>
                      </div>
                      <div
                        className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                        role="progressbar"
                        aria-label={`Konten tahap ${stage.label}`}
                        aria-valuemin={0}
                        aria-valuemax={summary.total}
                        aria-valuenow={stage.count}
                      >
                        <div
                          className={`h-full rounded-full transition-all ${stage.color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Jadwal Berikutnya
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Konten dengan tanggal rilis terdekat.
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                <CalendarDays size={18} />
              </span>
            </div>
            {loading ? (
              <div className="flex h-40 items-center justify-center gap-2 text-sm text-slate-400">
                <LoaderCircle size={18} className="animate-spin" />
                Memuat jadwal...
              </div>
            ) : error ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500 dark:bg-slate-800/60">
                Data jadwal tidak tersedia saat ini.
              </div>
            ) : upcomingContents.length === 0 ? (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/60">
                <p className="text-sm font-medium text-slate-600">
                  Belum ada jadwal rilis
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Atur tanggal rilis dari detail konten.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {upcomingContents.map((content) => (
                  <Link
                    key={content.id}
                    to="/alur-konten"
                    className="block rounded-xl border border-slate-100 p-3 transition hover:border-pink-200 hover:bg-pink-50/40 dark:border-slate-800 dark:hover:border-pink-900 dark:hover:bg-pink-950/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {content.title}
                      </p>
                      <span className="shrink-0 text-[11px] font-semibold text-pink-600 dark:text-pink-400">
                        {formatDate(content.scheduled_date)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <StatusBadge status={content.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 dark:border-slate-800 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                Aktivitas Terbaru
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Konten yang terakhir dibuat atau diperbarui.
              </p>
            </div>
            <Link
              to="/alur-konten"
              className="inline-flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400"
            >
              Lihat semua <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 p-12 text-sm text-slate-400">
              <LoaderCircle size={18} className="animate-spin" />
              Memuat aktivitas...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-sm text-slate-500">
              Aktivitas tidak tersedia saat ini.
            </div>
          ) : recentContents.length === 0 ? (
            <div className="p-10 text-center sm:p-12">
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-pink-50 text-pink-500 dark:bg-pink-950/50 dark:text-pink-400">
                <Video size={25} />
              </span>
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                Belum ada aktivitas konten
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Mulai dengan membuat draf konten pertamamu.
              </p>
              <Link
                to="/alur-konten"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-700"
              >
                <Plus size={16} />
                Buat konten
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentContents.map((content) => (
                <div
                  key={content.id}
                  className="flex flex-col gap-3 p-4 transition hover:bg-slate-50/70 dark:hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-pink-100 to-blue-100 text-pink-700 dark:from-pink-950/60 dark:to-blue-950/60 dark:text-pink-300">
                      <Video size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {content.title}
                      </p>
                      <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">
                        {(content.format_type || "Konten").replaceAll("_", " ")}
                        {" · "}
                        {content.updated_at || content.created_at
                          ? `Diperbarui ${formatDate(content.updated_at || content.created_at)}`
                          : "Aktivitas terbaru"}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={content.status} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
