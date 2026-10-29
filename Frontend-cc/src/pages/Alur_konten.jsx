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
  switch (stage) {
    case "idea": return "Ide";
    case "scripting": return "Scripting";
    case "recording": return "Recording";
    case "editing": return "Editing";
    case "ready": return "Siap (Ready)";
    case "published": return "Published";
    default: return stage;
  }
};

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
      const keyword = search.toLowerCase();
      const matchesSearch = item.title.toLowerCase().includes(keyword);
      const matchesStage = filterStage === "All" || item.status === filterStage;
      return matchesSearch && matchesStage;
    })
    .sort((a, b) => {
      const dateA = new Date(a.scheduled_date || 0);
      const dateB = new Date(b.scheduled_date || 0);

      if (sortBy === "date-asc") {
        return dateA - dateB;
      } else if (sortBy === "date-desc") {
        return dateB - dateA;
      }
      return 0;
    });

  const updateStatus = (id, newStatus) => {
    const target = contents.find((item) => item.id === id);

    if (newStatus === "published" && (!target || !target.published_url)) {
      alert("Gagal! Kolom Published URL wajib diisi jika konten sudah tayang.");
      return;
    }

    setContents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (activeContent && activeContent.id === id) {
      setActiveContent((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleSaveDetail = (e) => {
    e.preventDefault();
    if (activeContent.status === "published" && !activeContent.published_url) {
      alert("Gagal menyimpan! Status Published memerlukan Published URL yang valid.");
      return;
    }

    setContents((prev) =>
      prev.map((item) => (item.id === activeContent.id ? activeContent : item))
    );
    alert("Detail konten berhasil diperbarui!");
    setActiveContent(null);
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newTitle.trim(),
      format_type: newFormat,
      status: "idea",
      priority: newPriority,
      scheduled_date: newDate || new Date().toISOString().split("T")[0],
      script_draft: "",
      asset_preview_url: "",
      editing_review: "",
      published_url: "",
    };

    setContents((prev) => [newEntry, ...prev]);
    setNewTitle("");
    setNewDate("");
    setShowAddModal(false);
  };

  const handleDeleteContent = (id) => {
    if (window.confirm("Yakin ingin menghapus draf konten ini?")) {
      setContents((prev) => prev.filter((item) => item.id !== id));
      if (activeContent?.id === id) setActiveContent(null);
    }
  };

  const totalContents = contents.length;
  const publishedCount = contents.filter((i) => i.status === "published").length;
  const readyCount = contents.filter((i) => i.status === "ready").length;
  const inProgressCount = contents.filter(
    (i) => !["published", "ready", "idea"].includes(i.status)
  ).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 text-slate-800 dark:text-slate-100 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="bg-pink-400/20 dark:bg-pink-900/10 pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[140px]" />
      <div className="bg-blue-400/20 dark:bg-blue-900/10 pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-[140px]" />

      <div className="relative z-10">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/60 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-3">
              <Sparkles size={14} /> Content Pipeline Tracker
            </div>
            <h1 className="text-2xl font-bold dark:text-slate-50 text-slate-900 sm:text-3xl">
              Alur Konten & Produksi
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Kelola siklus hidup ide, draf naskah, review editing, hingga publikasi.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:opacity-95 shadow-md"
          >
            <Plus size={19} />
            Tambah Konten Baru
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Konten</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                <Radio size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold dark:text-slate-50 text-slate-900">{totalContents}</h2>
            <p className="mt-2 text-xs text-slate-400">Semua tahapan pipeline</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Dalam Produksi</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Clock size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold dark:text-slate-50 text-slate-900">{inProgressCount}</h2>
            <p className="mt-2 text-xs text-slate-400">Scripting / Recording / Editing</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Siap Unggah</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold dark:text-slate-50 text-slate-900">{readyCount}</h2>
            <p className="mt-2 text-xs text-slate-400">Status Ready</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Dipublikasi</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Send size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold dark:text-slate-50 text-slate-900">{publishedCount}</h2>
            <p className="mt-2 text-xs text-slate-400">Sudah tayang</p>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Buat Draf Ide Konten Baru
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddContent} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Judul Konten
                  </label>
                  <input
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Judul atau topik konten..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Format Konten
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  >
                    <option value="long_video">Long Video</option>
                    <option value="short_video">Short Video</option>
                    <option value="carousel">Carousel</option>
                    <option value="single_post">Single Post</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Prioritas
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  >
                    <option value="low">Prioritas: Low</option>
                    <option value="medium">Prioritas: Medium</option>
                    <option value="high">Prioritas: High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Jadwal Rilis
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-95 shadow-sm"
                  >
                    Simpan Draf
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 dark:border-slate-800 p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold dark:text-slate-50 text-slate-900">
                Daftar Konten Pipeline
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pantau dan kelola seluruh konten kreatifmu dalam satu tabel terpadu.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row flex-wrap">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari judul konten..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="min-w-0 bg-transparent py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
                />
              </div>

              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none"
              >
                <option value="All">Semua Status</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {formatStageName(stage)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3">
                <ArrowUpDown size={16} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none font-medium"
                >
                  <option value="date-asc">Jadwal: Terdekat (Asc)</option>
                  <option value="date-desc">Jadwal: Terjauh (Desc)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Judul Konten</th>
                  <th className="px-6 py-4 font-semibold">Format</th>
                  <th className="px-6 py-4 font-semibold">Prioritas</th>
                  <th className="px-6 py-4 font-semibold">Status Pipeline</th>
                  <th className="px-6 py-4 font-semibold">Jadwal Rilis</th>
                  <th className="px-6 py-4 font-semibold">Kelengkapan Produksi</th>
                  <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredContents.map((item) => (
                  <tr key={item.id} className="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setActiveContent(item)}
                        className="text-left font-bold text-slate-900 dark:text-slate-100 hover:text-pink-600 dark:hover:text-pink-400 transition"
                      >
                        {item.title}
                      </button>
                      <p className="text-xs text-slate-400">ID #{item.id}</p>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 capitalize">
                      {item.format_type.replace("_", " ")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${item.priority === "high"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300"
                            : item.priority === "medium"
                              ? "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-pink-500 capitalize"
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                      >
                        {stages.map((stage) => (
                          <option key={stage} value={stage}>
                            {formatStageName(stage)}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {item.scheduled_date}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span title={item.script_draft ? "Naskah ada" : "Belum ada naskah"} className={`flex items-center gap-1 ${item.script_draft ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-slate-400"}`}>
                          <FileText size={14} /> Naskah
                        </span>
                        <span title={item.asset_preview_url ? "Preview ada" : "Belum ada preview"} className={`flex items-center gap-1 ${item.asset_preview_url ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-400"}`}>
                          <Eye size={14} /> Aset
                        </span>
                        <span title={item.editing_review ? "Ada catatan review" : "Belum ada review"} className={`flex items-center gap-1 ${item.editing_review ? "text-purple-600 dark:text-purple-400 font-semibold" : "text-slate-400"}`}>
                          <MessageSquare size={14} /> Review
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveContent(item)}
                          className="rounded-lg bg-pink-50 dark:bg-pink-950/60 px-3 py-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900 transition"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleDeleteContent(item.id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 transition"
                          title="Hapus Konten"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredContents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-12 text-center text-sm text-slate-400">
                      Belum ada data konten. Silakan klik tombol <b>&quot;Tambah Konten Baru&quot;</b> di pojok kanan atas untuk mulai membuat draf.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
            Menampilkan {filteredContents.length} dari {contents.length} konten
          </div>
        </section>

        {activeContent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400">
                    Detail Produksi Konten #{activeContent.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-1">
                    {activeContent.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveContent(null)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveDetail} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Status Pipeline Saat Ini
                    </label>
                    <select
                      value={activeContent.status}
                      onChange={(e) =>
                        setActiveContent({ ...activeContent, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-pink-500 capitalize"
                    >
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {formatStageName(stage)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Jadwal Rilis (Scheduled Date)
                    </label>
                    <input
                      type="date"
                      value={activeContent.scheduled_date}
                      onChange={(e) =>
                        setActiveContent({ ...activeContent, scheduled_date: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    <FileText size={14} className="text-pink-600 dark:text-pink-400" /> Lampiran Draf Naskah / Hook (Script Draft)
                  </label>
                  <textarea
                    rows={4}
                    value={activeContent.script_draft}
                    onChange={(e) =>
                      setActiveContent({ ...activeContent, script_draft: e.target.value })
                    }
                    placeholder="Tulis draf naskah, alur cerita, atau hook di sini..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    <Eye size={14} className="text-blue-600 dark:text-blue-400" /> Link Preview Aset (Recording / Editing)
                  </label>
                  <input
                    type="url"
                    value={activeContent.asset_preview_url}
                    onChange={(e) =>
                      setActiveContent({ ...activeContent, asset_preview_url: e.target.value })
                    }
                    placeholder="https://drive.google.com/... atau https://loom.com/..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    <MessageSquare size={14} className="text-purple-600 dark:text-purple-400" /> Review Hasil Editing & Revisi
                  </label>
                  <textarea
                    rows={3}
                    value={activeContent.editing_review}
                    onChange={(e) =>
                      setActiveContent({ ...activeContent, editing_review: e.target.value })
                    }
                    placeholder="Catatan revisi atau feedback dari editor/kreator..."
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div className="rounded-2xl border border-pink-100 dark:border-pink-950 bg-pink-50/50 dark:bg-pink-950/30 p-4">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase text-pink-900 dark:text-pink-300 mb-1">
                    <Send size={14} className="text-pink-600 dark:text-pink-400" /> URL Publikasi Postingan (Wajib jika Status = Published)
                  </label>
                  <input
                    type="url"
                    value={activeContent.published_url}
                    onChange={(e) =>
                      setActiveContent({ ...activeContent, published_url: e.target.value })
                    }
                    placeholder="https://youtube.com/watch?v=... atau https://tiktok.com/@..."
                    className="w-full rounded-xl border border-pink-200 dark:border-pink-800 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                  <p className="mt-1.5 text-xs text-pink-600 dark:text-pink-400">
                    *Sesuai aturan sistem, konten tidak bisa dipublish jika URL ini kosong.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveContent(null)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-95 shadow-sm"
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