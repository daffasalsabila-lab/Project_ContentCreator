import { useState } from "react";
import {
  Radio,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  FileText,
  Eye,
  MessageSquare,
  X,
  Save,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";

const stages = ["idea", "scripting", "recording", "editing", "ready", "published"];

const formatStageName = (stage) => {
  const names = {
    idea: "Ide",
    scripting: "Scripting",
    recording: "Recording",
    editing: "Editing",
    ready: "Siap (Ready)",
    published: "Published",
  };

  return names[stage] || stage;
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
};

const getToday = () => new Date().toISOString().split("T")[0];

export default function Alur_konten() {
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeContent, setActiveContent] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newFormat, setNewFormat] = useState("long_video");
  const [newPriority, setNewPriority] = useState("medium");
  const [newDate, setNewDate] = useState("");

  const filteredContents = contents
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStage =
        filterStage === "All" || item.status === filterStage;

      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      const dateA = a.scheduled_date || "9999-12-31";
      const dateB = b.scheduled_date || "9999-12-31";

      return sortBy === "date-desc"
        ? dateB.localeCompare(dateA)
        : dateA.localeCompare(dateB);
    });

  const totalContents = contents.length;
  const publishedCount = contents.filter(
    (item) => item.status === "published"
  ).length;
  const readyCount = contents.filter(
    (item) => item.status === "ready"
  ).length;
  const inProgressCount = contents.filter((item) =>
    ["scripting", "recording", "editing"].includes(item.status)
  ).length;

  const updateStatus = (id, newStatus) => {
    const target = contents.find((item) => item.id === id);
    if (!target) return;

    if (newStatus === "published" && !isValidUrl(target.published_url || "")) {
      alert("Masukkan URL publikasi yang valid sebelum menerbitkan konten.");
      return;
    }

    const changes = {
      status: newStatus,
      ...(newStatus === "published" && !target.published_date
        ? { published_date: getToday() }
        : {}),
    };

    setContents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
    );

    if (activeContent?.id === id) {
      setActiveContent((prev) => ({ ...prev, ...changes }));
    }
  };

  const handleSaveDetail = (e) => {
    e.preventDefault();

    const title = activeContent.title.trim();

    if (!title) {
      alert("Judul konten wajib diisi.");
      return;
    }

    if (
      activeContent.status === "published" &&
      !isValidUrl(activeContent.published_url || "")
    ) {
      alert("Status Published memerlukan URL publikasi yang valid.");
      return;
    }

    const updatedContent = {
      ...activeContent,
      title,
      published_date:
        activeContent.status === "published"
          ? activeContent.published_date || getToday()
          : activeContent.published_date || "",
      updated_at: new Date().toISOString(),
    };

    setContents((prev) =>
      prev.map((item) =>
        item.id === updatedContent.id ? updatedContent : item
      )
    );

    alert("Detail konten berhasil diperbarui!");
    setActiveContent(null);
  };

  const handleAddContent = (e) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      alert("Judul konten wajib diisi.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      description: "",
      format_type: newFormat,
      status: "idea",
      priority: newPriority,
      scheduled_date: newDate,
      published_date: "",
      script_draft: "",
      asset_preview_url: "",
      editing_review: "",
      published_url: "",
      channel_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setContents((prev) => [newEntry, ...prev]);
    setNewTitle("");
    setNewFormat("long_video");
    setNewPriority("medium");
    setNewDate("");
    setShowAddModal(false);
  };

  const handleDeleteContent = (id) => {
    if (!window.confirm("Yakin ingin menghapus draf konten ini?")) return;

    setContents((prev) => prev.filter((item) => item.id !== id));

    if (activeContent?.id === id) {
      setActiveContent(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 p-4 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-pink-400/20 blur-[140px] dark:bg-pink-900/10" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-[140px] dark:bg-blue-900/10" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
              <Sparkles size={14} /> Content Pipeline Tracker
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
              Alur Konten & Produksi
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Kelola siklus hidup ide, draf naskah, review editing, hingga publikasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
          >
            <Plus size={19} />
            Tambah Konten Baru
          </button>
        </div>

        {/* Statistik */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Konten",
              value: totalContents,
              description: "Semua tahapan pipeline",
              icon: Radio,
              color: "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400",
            },
            {
              title: "Dalam Produksi",
              value: inProgressCount,
              description: "Scripting / Recording / Editing",
              icon: Clock,
              color: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
            },
            {
              title: "Siap Unggah",
              value: readyCount,
              description: "Status Ready",
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
            },
            {
              title: "Dipublikasi",
              value: publishedCount,
              description: "Sudah tayang",
              icon: Send,
              color: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
            },
          ].map(({ title, value, description, icon: Icon, color }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {title}
                </p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                {value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">{description}</p>
            </div>
          ))}
        </div>

        {/* Modal Tambah Konten */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Buat Draf Ide Konten Baru
                </h2>

                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Tutup modal"
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddContent} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Judul Konten
                  </label>
                  <input
                    required
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Judul atau topik konten..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Format Konten
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="long_video">Long Video</option>
                    <option value="short_video">Short Video</option>
                    <option value="carousel">Carousel</option>
                    <option value="single_post">Single Post</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Prioritas
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Jadwal Rilis
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Simpan Draf
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabel Konten */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                Daftar Konten Pipeline
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pantau dan kelola seluruh konten dalam satu tabel.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-800">
                <Search size={18} className="text-slate-400" />
                <input
                  type="search"
                  placeholder="Cari judul konten..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="min-w-0 bg-transparent py-2.5 text-sm outline-none"
                />
              </div>

              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="All">Semua Status</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {formatStageName(stage)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-800">
                <ArrowUpDown size={16} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent py-2.5 text-sm outline-none"
                >
                  <option value="date-asc">Jadwal: Terdekat</option>
                  <option value="date-desc">Jadwal: Terjauh</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4">Judul Konten</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Prioritas</th>
                  <th className="px-6 py-4">Status Pipeline</th>
                  <th className="px-6 py-4">Jadwal Rilis</th>
                  <th className="px-6 py-4">Kelengkapan</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredContents.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setActiveContent({ ...item })}
                        className="text-left font-bold text-slate-900 transition hover:text-pink-600 dark:text-slate-100"
                      >
                        {item.title}
                      </button>
                      <p className="text-xs text-slate-400">ID #{item.id}</p>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {item.format_type.replace("_", " ")}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${
                        item.priority === "high"
                          ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300"
                          : item.priority === "medium"
                          ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                      >
                        {stages.map((stage) => (
                          <option key={stage} value={stage}>
                            {formatStageName(stage)}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">
                      {item.scheduled_date || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`flex items-center gap-1 ${
                          item.script_draft ? "text-emerald-600" : "text-slate-400"
                        }`}>
                          <FileText size={14} /> Naskah
                        </span>
                        <span className={`flex items-center gap-1 ${
                          item.asset_preview_url ? "text-blue-600" : "text-slate-400"
                        }`}>
                          <Eye size={14} /> Aset
                        </span>
                        <span className={`flex items-center gap-1 ${
                          item.editing_review ? "text-purple-600" : "text-slate-400"
                        }`}>
                          <MessageSquare size={14} /> Review
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveContent({ ...item })}
                          className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 transition hover:bg-pink-100 dark:bg-pink-950/60 dark:text-pink-400"
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteContent(item.id)}
                          aria-label={`Hapus ${item.title}`}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredContents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-sm text-slate-400">
                      Belum ada data konten. Klik "Tambah Konten Baru" untuk mulai membuat draf.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            Menampilkan {filteredContents.length} dari {contents.length} konten
          </div>
        </section>

        {/* Modal Detail */}
        {activeContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                    Detail Produksi Konten #{activeContent.id}
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-50">
                    {activeContent.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveContent(null)}
                  aria-label="Tutup detail"
                  className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveDetail} className="mt-6 space-y-5">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    Judul Konten
                  </label>
                  <input
                    required
                    value={activeContent.title}
                    onChange={(e) =>
                      setActiveContent({ ...activeContent, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Status Pipeline
                    </label>
                    <select
                      value={activeContent.status}
                      onChange={(e) =>
                        setActiveContent({ ...activeContent, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {formatStageName(stage)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      Jadwal Rilis
                    </label>
                    <input
                      type="date"
                      value={activeContent.scheduled_date || ""}
                      onChange={(e) =>
                        setActiveContent({
                          ...activeContent,
                          scheduled_date: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    <FileText size={14} /> Draf Naskah / Hook
                  </label>
                  <textarea
                    rows={4}
                    value={activeContent.script_draft || ""}
                    onChange={(e) =>
                      setActiveContent({
                        ...activeContent,
                        script_draft: e.target.value,
                      })
                    }
                    placeholder="Tulis draf naskah atau hook..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    <Eye size={14} /> Link Preview Aset
                  </label>
                  <input
                    type="url"
                    value={activeContent.asset_preview_url || ""}
                    onChange={(e) =>
                      setActiveContent({
                        ...activeContent,
                        asset_preview_url: e.target.value,
                      })
                    }
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                    <MessageSquare size={14} /> Review Editing & Revisi
                  </label>
                  <textarea
                    rows={3}
                    value={activeContent.editing_review || ""}
                    onChange={(e) =>
                      setActiveContent({
                        ...activeContent,
                        editing_review: e.target.value,
                      })
                    }
                    placeholder="Catatan revisi atau feedback..."
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>

                <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 dark:border-pink-950 dark:bg-pink-950/30">
                  <label className="mb-1 flex items-center gap-2 text-xs font-bold uppercase text-pink-900 dark:text-pink-300">
                    <Send size={14} /> URL Publikasi (Wajib jika Published)
                  </label>
                  <input
                    type="url"
                    value={activeContent.published_url || ""}
                    onChange={(e) =>
                      setActiveContent({
                        ...activeContent,
                        published_url: e.target.value,
                      })
                    }
                    placeholder="https://youtube.com/..."
                    className="w-full rounded-xl border border-pink-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500 dark:border-pink-800 dark:bg-slate-800"
                  />
                  <p className="mt-1.5 text-xs text-pink-600 dark:text-pink-400">
                    Konten tidak dapat dipublikasikan tanpa URL yang valid.
                  </p>
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveContent(null)}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    <Save size={16} /> Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}