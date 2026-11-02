import { useEffect, useMemo, useState } from "react";
import {
  Radio,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Send,
  Trash2,
  FileText,
  X,
  Save,
  ArrowUpDown,
  Sparkles,
  ListTodo,
} from "lucide-react";

import contentService from "../services/contentService";

// ==========================================
// KONFIGURASI
// ==========================================

const stages = [
  "idea",
  "scripting",
  "recording",
  "editing",
  "ready",
  "published",
];

const stageNames = {
  idea: "Ide",
  scripting: "Scripting",
  recording: "Recording",
  editing: "Editing",
  ready: "Siap (Ready)",
  published: "Published",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800";

const areaClass = `${inputClass} p-3`;

const today = () => new Date().toISOString().slice(0, 10);

const unwrap = (value) => value?.data ?? value;

const validUrl = (value) => {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
};

// ==========================================
// MODAL
// ==========================================

function Modal({ title, subtitle, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div
        className={`max-h-[90dvh] w-full ${wide ? "max-w-3xl" : "max-w-lg"
          } overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8`}
      >
        <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div>
            {subtitle && (
              <p className="text-xs font-bold uppercase tracking-widest text-pink-600">
                {subtitle}
              </p>
            )}

            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

// ==========================================
// MODAL TAMBAH KONTEN
// ==========================================

function AddContentModal({ channels, onClose, onSave }) {
  const [form, setForm] = useState({
    channels_id: channels[0]?.id || "",
    title: "",
    description: "",
    script_draft: "",
    format_type: "long_video",
    priority: "medium",
    scheduled_date: "",
  });

  const change = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    <Modal title="Buat Draf Ide Konten Baru" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Target Channel / Saluran
          </label>

          <select
            required
            disabled={channels.length === 0}
            className={inputClass}
            value={form.channels_id}
            onChange={change("channels_id")}
          >
            {channels.map((channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.platform?.toUpperCase()} - {channel.handle_name}
              </option>
            ))}
          </select>
          {channels.length === 0 && (
            <p className="mt-1 text-xs text-red-500">
              Tambahkan saluran terlebih dahulu sebelum membuat konten.
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Judul Konten
          </label>

          <input
            required
            autoFocus
            className={inputClass}
            value={form.title}
            onChange={change("title")}
            placeholder="Judul atau topik konten..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Ringkasan Konsep
          </label>

          <textarea
            rows={2}
            className={areaClass}
            value={form.description}
            onChange={change("description")}
            placeholder="Deskripsi singkat konten..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Draf Naskah / Hook
          </label>

          <textarea
            rows={3}
            className={areaClass}
            value={form.script_draft}
            onChange={change("script_draft")}
            placeholder="Tulis draf teks atau hook..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Format Konten
            </label>

            <select
              className={inputClass}
              value={form.format_type}
              onChange={change("format_type")}
            >
              <option value="long_video">Long Video</option>
              <option value="short_video">Short Video</option>
              <option value="carousel">Carousel</option>
              <option value="single_post">Single Post</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Prioritas
            </label>

            <select
              className={inputClass}
              value={form.priority}
              onChange={change("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Jadwal Rilis
          </label>

          <input
            type="date"
            className={inputClass}
            value={form.scheduled_date}
            onChange={change("scheduled_date")}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={channels.length === 0}
            className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Simpan Draf
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ==========================================
// CHECKLIST TUGAS PRODUKSI
// ==========================================

function ChecklistPanel({ contentId }) {
  const [items, setItems] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const completed = items.filter(
    (item) => Number(item.is_completed) === 1
  ).length;

  useEffect(() => {
    let active = true;

    const fetchItems = async () => {
      try {
        const result = await contentService.getChecklists(contentId);
        const data = unwrap(result);
        if (active) {
          setItems(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message || err.message || "Checklist gagal dimuat."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchItems();
    return () => {
      active = false;
    };
  }, [contentId]);

  // Menambahkan tugas
  const addItem = async () => {
    if (!taskName.trim()) return;

    setSaving(true);
    setError("");

    try {
      const result = await contentService.addChecklist(contentId, taskName.trim());
      const created = unwrap(result);

      if (created?.id) {
        setItems((prev) => [...prev, created]);
      } else {
        const result = await contentService.getChecklists(contentId);
        const data = unwrap(result);
        setItems(Array.isArray(data) ? data : []);
      }

      setTaskName("");
    } catch (err) {
      setError(err.message || "Tugas gagal ditambahkan.");
    } finally {
      setSaving(false);
    }
  };

  // Mengubah status checklist
  const toggleItem = async (item) => {
    setError("");

    try {
      const result = await contentService.toggleChecklist(item.id);
      const updated = unwrap(result);

      setItems((prev) =>
        prev.map((task) =>
          task.id === item.id
            ? {
              ...task,
              is_completed:
                updated?.is_completed !== undefined
                  ? updated.is_completed
                  : Number(task.is_completed) !== 1,
            }
            : task
        )
      );
    } catch (err) {
      setError(err.message || "Status tugas gagal diperbarui.");
    }
  };

  // Menghapus checklist
  const deleteItem = async (id) => {
    if (!window.confirm("Yakin ingin menghapus tugas ini?")) {
      return;
    }

    setError("");

    try {
      await contentService.deleteChecklist(id);

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Tugas gagal dihapus.");
    }
  };

  return (
    <section className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 dark:border-pink-950 dark:bg-pink-950/20">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
            <ListTodo size={17} className="text-pink-500" />
            Rencana Tugas Konten
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Tambahkan tugas dan centang setelah selesai.
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-slate-800">
          {completed}/{items.length} selesai
        </span>
      </div>

      {items.length > 0 && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-pink-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-500 to-blue-500"
            style={{
              width: `${(completed / items.length) * 100}%`,
            }}
          />
        </div>
      )}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
        <label className="mb-1 block text-xs font-semibold text-slate-500">
          Nama Tugas
        </label>

        <input
          className={inputClass}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Contoh: Membuat konsep hook video"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={addItem}
            disabled={saving || !taskName.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50"
          >
            <Plus size={15} />
            {saving ? "Menambahkan..." : "Tambah Tugas"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-5 text-center text-sm text-slate-400">
          Memuat daftar tugas...
        </p>
      ) : items.length === 0 ? (
        <div className="mt-3 rounded-xl border border-dashed border-pink-200 px-4 py-6 text-center dark:border-pink-900">
          <ListTodo size={24} className="mx-auto mb-2 text-pink-300" />

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Belum ada tugas untuk konten ini.
          </p>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {items.map((item, index) => {
            const isCompleted = Number(item.is_completed) === 1;

            return (
              <div
                key={item.id ?? index}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleItem(item)}
                  disabled={!item.id}
                  aria-label={`Tandai ${item.task_name} selesai`}
                  className="mt-1 h-4 w-4 shrink-0 accent-pink-500"
                />

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold ${isCompleted
                      ? "text-slate-400 line-through"
                      : "text-slate-800 dark:text-slate-100"
                      }`}
                  >
                    {item.task_name || `Tugas ${index + 1}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  disabled={!item.id}
                  aria-label="Hapus tugas"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ==========================================
// MODAL DETAIL KONTEN
// ==========================================

function DetailModal({ item, onChange, onClose, onSave }) {
  const field = (key) => (e) => {
    onChange(key, e.target.value);
  };

  return (
    <Modal
      wide
      title={item.title}
      subtitle={`Detail Produksi Konten #${item.id}`}
      onClose={onClose}
    >
      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Judul Konten
          </label>

          <input
            required
            className={inputClass}
            value={item.title || ""}
            onChange={field("title")}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Deskripsi / Konsep Singkat
          </label>

          <textarea
            rows={2}
            className={areaClass}
            value={item.description || ""}
            onChange={field("description")}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Status Pipeline
            </label>

            <select
              className={inputClass}
              value={item.status}
              onChange={field("status")}
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stageNames[stage]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-500">
              Jadwal Rilis
            </label>

            <input
              type="date"
              className={inputClass}
              value={item.scheduled_date || ""}
              onChange={field("scheduled_date")}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Draf Naskah / Hook
          </label>

          <textarea
            rows={4}
            className={areaClass}
            value={item.script_draft || ""}
            onChange={field("script_draft")}
            placeholder="Tulis draf naskah atau hook..."
          />
        </div>

        {/* Checklist */}
        <ChecklistPanel key={item.id} contentId={item.id} />

        <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4 dark:border-pink-950 dark:bg-pink-950/30">
          <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-pink-800 dark:text-pink-300">
            <Send size={14} />
            URL Publikasi (Wajib jika Published)
          </label>

          <input
            type="url"
            className={inputClass}
            value={item.published_url || ""}
            onChange={field("published_url")}
            placeholder="https://youtube.com/..."
          />

          <p className="mt-1.5 text-xs text-pink-600 dark:text-pink-400">
            Konten tidak dapat dipublikasikan tanpa URL yang valid.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold dark:border-slate-700"
          >
            Batal
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white"
          >
            <Save size={16} />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ==========================================
// HALAMAN UTAMA ALUR KONTEN
// ==========================================

export default function Alur_konten() {
  const [contents, setContents] = useState([]);
  const [channels, setChannels] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeContent, setActiveContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Mengambil data konten dan channel
  useEffect(() => {
    Promise.all([
      contentService.getContents(),
      contentService.getChannels(),
    ])
      .then(([contentRes, channelRes]) => {
        const contentData = unwrap(contentRes);
        const channelData = unwrap(channelRes);
        if (!Array.isArray(contentData) || !Array.isArray(channelData)) {
          throw new Error("Format data konten atau saluran tidak valid.");
        }
        setContents(contentData);
        setChannels(channelData);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
        setLoadError(
          error.response?.data?.message || error.message ||
          "Gagal memuat konten dan saluran."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filter dan sorting konten
  const filteredContents = useMemo(() => {
    return contents
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(search.trim().toLowerCase()) &&
          (filterStage === "All" || item.status === filterStage)
      )
      .sort((a, b) => {
        const dateA = a.scheduled_date || "9999-12-31";
        const dateB = b.scheduled_date || "9999-12-31";

        return sortBy === "date-desc"
          ? dateB.localeCompare(dateA)
          : dateA.localeCompare(dateB);
      });
  }, [contents, search, filterStage, sortBy]);

  // Statistik konten
  const stats = [
    {
      title: "Total Konten",
      value: contents.length,
      description: "Semua tahapan pipeline",
      icon: Radio,
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Dalam Produksi",
      value: contents.filter((x) =>
        ["scripting", "recording", "editing"].includes(x.status)
      ).length,
      description: "Scripting / Recording / Editing",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Siap Unggah",
      value: contents.filter((x) => x.status === "ready").length,
      description: "Status Ready",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Dipublikasi",
      value: contents.filter((x) => x.status === "published").length,
      description: "Sudah tayang",
      icon: Send,
      color: "bg-blue-50 text-blue-600",
    },
  ];

  // Mengubah status konten
  const updateStatus = async (id, status) => {
    const current = contents.find((item) => item.id === id);

    if (!current) return;

    if (
      status === "published" &&
      !validUrl(current.published_url || "")
    ) {
      return alert(
        "Masukkan URL publikasi yang valid sebelum menerbitkan konten."
      );
    }

    const changes = {
      status,
      ...(status === "published" && !current.published_date
        ? { published_date: today() }
        : {}),
    };

    try {
      await contentService.updateContent(id, {
        ...current,
        ...changes,
      });

      setContents((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...changes } : item
        )
      );

      setActiveContent((prev) =>
        prev?.id === id ? { ...prev, ...changes } : prev
      );
    } catch (error) {
      console.error(error);
      alert("Gagal memperbarui status di server.");
    }
  };

  // Menyimpan detail konten
  const saveDetail = async (e) => {
    e.preventDefault();

    const title = activeContent.title?.trim();

    if (!title) {
      return alert("Judul konten wajib diisi.");
    }

    if (
      activeContent.status === "published" &&
      !validUrl(activeContent.published_url || "")
    ) {
      return alert(
        "Status Published memerlukan URL publikasi yang valid."
      );
    }

    const updated = {
      ...activeContent,
      title,
      published_date:
        activeContent.status === "published"
          ? activeContent.published_date || today()
          : activeContent.published_date || "",
    };

    try {
      await contentService.updateContent(updated.id, updated);

      setContents((prev) =>
        prev.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setActiveContent(null);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan perubahan ke server.");
    }
  };

  // Menambahkan konten baru
  const addContent = async (form) => {
    if (!form.title.trim()) {
      return alert("Judul konten wajib diisi.");
    }

    const payload = {
      ...form,
      channels_id: form.channels_id ? Number(form.channels_id) : null,
      title: form.title.trim(),
      description: form.description.trim(),
      script_draft: form.script_draft.trim(),
      scheduled_date: form.scheduled_date || null,
    };

    try {
      const created = unwrap(
        await contentService.createContent(payload)
      );

      if (!created?.id) {
        throw new Error("Respons server tidak berisi data konten.");
      }

      setContents((prev) => [created, ...prev]);
      setShowAddModal(false);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Gagal menyimpan konten baru ke server."
      );
    }
  };

  // Menghapus konten
  const deleteContent = async (id) => {
    if (!window.confirm("Yakin ingin menghapus draf konten ini?")) {
      return;
    }

    try {
      await contentService.deleteContent(id);

      setContents((prev) =>
        prev.filter((item) => item.id !== id)
      );

      if (activeContent?.id === id) {
        setActiveContent(null);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus konten dari server.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 p-4 text-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-pink-400/20 blur-[140px] dark:bg-pink-900/10" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-[140px] dark:bg-blue-900/10" />

      <div className="relative z-10">
        {/* HEADER */}
        <header className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-8">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
              <Sparkles size={14} />
              Content Pipeline Tracker
            </span>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Alur Konten & Produksi
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Kelola ide, naskah, produksi, editing, hingga publikasi.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            disabled={loading || loadError !== ""}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-md"
          >
            <Plus size={19} />
            Tambah Konten Baru
          </button>
        </header>

        {/* STATISTIK */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(
            ({ title, value, description, icon: Icon, color }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{title}</span>

                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold">{value}</h2>

                <p className="mt-2 text-xs text-slate-400">
                  {description}
                </p>
              </article>
            )
          )}
        </section>

        {loadError && (
          <p role="alert" className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {loadError}
          </p>
        )}

        {/* MODAL TAMBAH KONTEN */}
        {showAddModal && (
          <AddContentModal
            channels={channels}
            onClose={() => setShowAddModal(false)}
            onSave={addContent}
          />
        )}

        {/* MODAL DETAIL KONTEN */}
        {activeContent && (
          <DetailModal
            item={activeContent}
            onChange={(key, value) =>
              setActiveContent((prev) => ({
                ...prev,
                [key]: value,
              }))
            }
            onClose={() => setActiveContent(null)}
            onSave={saveDetail}
          />
        )}

        {/* TABEL PIPELINE */}
        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold">
                Daftar Konten Pipeline
              </h2>

              <p className="mt-1 text-sm text-slate-500">
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
                className={inputClass}
              >
                <option value="All">Semua Status</option>

                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stageNames[stage]}
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
              <thead className="bg-slate-50/80 text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                <tr>
                  {[
                    "Judul Konten",
                    "Format",
                    "Prioritas",
                    "Status Pipeline",
                    "Jadwal Rilis",
                    "Kelengkapan",
                    "Aksi",
                  ].map((name) => (
                    <th key={name} className="px-6 py-4">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredContents.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setActiveContent({ ...item })}
                        className="text-left font-bold hover:text-pink-600"
                      >
                        {item.title}
                      </button>

                      <p className="text-xs text-slate-400">
                        ID #{item.id}
                      </p>
                    </td>

                    <td className="px-6 py-4 capitalize text-slate-600 dark:text-slate-300">
                      {item.format_type?.replaceAll("_", " ")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${item.priority === "high"
                          ? "bg-red-50 text-red-600"
                          : item.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item.id, e.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-800"
                      >
                        {stages.map((stage) => (
                          <option key={stage} value={stage}>
                            {stageNames[stage]}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-300">
                      {item.scheduled_date || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={
                            item.script_draft
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }
                        >
                          <FileText size={14} className="inline" />
                          {" "}Naskah
                        </span>

                        <span
                          className={
                            item.description
                              ? "text-blue-600"
                              : "text-slate-400"
                          }
                        >
                          Konsep
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveContent({ ...item })}
                          className="rounded-lg bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-600 hover:bg-pink-100"
                        >
                          Detail
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteContent(item.id)}
                          aria-label={`Hapus ${item.title}`}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && filteredContents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-12 text-center text-sm text-slate-400"
                    >
                      {loadError
                        ? "Data konten gagal dimuat."
                        : "Belum ada data konten. Klik \"Tambah Konten Baru\" untuk mulai membuat draf."}
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-sm text-slate-400">
                      Memuat data konten...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500 dark:border-slate-800">
            Menampilkan {filteredContents.length} dari {contents.length}{" "}
            konten
          </footer>
        </section>
      </div>
    </main>
  );
}