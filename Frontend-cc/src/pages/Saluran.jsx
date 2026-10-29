import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Globe,
  CheckCircle2,
  AlertCircle,
  Radio,
  Loader2,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

const platformBadgeColors = {
  Instagram: "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-900",
  YouTube: "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 border-red-200 dark:border-red-900",
  TikTok: "bg-slate-900 dark:bg-slate-800 text-white border-slate-700 dark:border-slate-700",
  LinkedIn: "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900",
};

const formatNumber = (number = 0) =>
  new Intl.NumberFormat("id-ID").format(number);

export default function Saluran() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("Semua");
  const [showModal, setShowModal] = useState(false);

  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newPlatform, setNewPlatform] = useState("Instagram");

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        setChannels([]);
      } catch (error) {
        console.error("Gagal mengambil data saluran:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const connected = channels.filter(
    (channel) => channel.status === "Terhubung"
  ).length;

  const totalFollowers = channels.reduce(
    (total, channel) => total + (Number(channel.followers) || 0),
    0
  );

  const filteredChannels = channels.filter((channel) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      channel.name?.toLowerCase().includes(keyword) ||
      channel.username?.toLowerCase().includes(keyword) ||
      channel.handle_name?.toLowerCase().includes(keyword);

    const matchesPlatform =
      platformFilter === "Semua" ||
      channel.platform === platformFilter;

    return matchesSearch && matchesPlatform;
  });

  async function addChannel(event) {
    event.preventDefault();

    if (!newName.trim() || !newUsername.trim()) return;

    const newChannelData = {
      name: newName.trim(),
      handle_name: newUsername.trim().startsWith("@") ? newUsername.trim() : `@${newUsername.trim()}`,
      url: newUrl.trim(),
      platform: newPlatform,
      status: "Terhubung",
      followers: 1250,
      posts: 12,
    };

    try {
      setChannels((prev) => [...prev, { id: Date.now(), ...newChannelData }]);

      setNewName("");
      setNewUsername("");
      setNewUrl("");
      setNewPlatform("Instagram");
      setShowModal(false);
    } catch (error) {
      console.error("Gagal menambahkan saluran:", error);
    }
  }

  async function removeChannel(id) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus saluran ini?"
    );

    if (confirmed) {
      try {
        setChannels((prev) => prev.filter((channel) => channel.id !== id));
      } catch (error) {
        console.error("Gagal menghapus saluran:", error);
      }
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 text-slate-800 dark:text-slate-100 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="bg-pink-400/20 dark:bg-pink-900/10 pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full blur-[140px]" />
      <div className="bg-blue-400/20 dark:bg-blue-900/10 pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full blur-[140px]" />

      <div className="relative z-10">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 dark:bg-pink-950/60 px-3 py-1 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-3">
              <Sparkles size={14} /> Social Channels Manager
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
              Saluran (Channels)
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Kelola semua akun media sosial dan tautan analitik dalam satu tempat.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:opacity-95 shadow-md"
          >
            <Plus size={19} />
            Tambah Saluran
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Saluran</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                <Radio size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
              {channels.length}
            </h2>
            <p className="mt-2 text-xs text-slate-400">Semua platform terdaftar</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Saluran Terhubung</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
              {connected}
            </h2>
            <p className="mt-2 text-xs text-slate-400">Siap untuk analitik</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm sm:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Pengikut</p>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Globe size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
              {formatNumber(totalFollowers)}
            </h2>
            <p className="mt-2 text-xs text-slate-400">Akumulasi seluruh pengikut</p>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                  Tambah Saluran Baru
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={addChannel} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Nama Saluran
                  </label>
                  <input
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Contoh: Bisnisku Official"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Username / Handle
                  </label>
                  <input
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Contoh: @bisnisku"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    URL Platform / Analitik
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://instagram.com/bisnisku"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Pilih Platform
                  </label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-pink-500"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:opacity-95 transition shadow-sm"
                  >
                    Simpan Saluran
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 dark:border-slate-800 p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                Daftar Saluran
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Pantau status dan tautan akun yang kamu kelola.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3">
                <Search size={18} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari saluran atau username..."
                  className="min-w-0 bg-transparent py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
                />
              </div>

              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 outline-none"
              >
                <option value="Semua">Semua Platform</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="TikTok">TikTok</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 text-slate-400">
              <Loader2 className="animate-spin mr-2" size={24} />
              <span>Memuat data saluran...</span>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredChannels.map((channel) => {
                const badgeStyle = platformBadgeColors[channel.platform] || "bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900";
                const isConnected = channel.status === "Terhubung";

                return (
                  <div
                    key={channel.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-2 rounded-xl text-xs font-bold border uppercase tracking-wider shrink-0 ${badgeStyle}`}>
                        {channel.platform}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {channel.name}
                          </h3>
                          {channel.url && (
                            <a
                              href={channel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition"
                              title="Kunjungi Tautan"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                          {channel.handle_name || channel.username}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 justify-between md:justify-end">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${isConnected
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                              : "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                            }`}
                        >
                          {isConnected ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
                          {channel.status || "Perlu koneksi"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-right sm:w-40">
                        <div>
                          <p className="text-xs text-slate-400">Pengikut</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {formatNumber(channel.followers)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Konten</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                            {channel.posts || 0}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeChannel(channel.id)}
                        title="Hapus saluran"
                        aria-label={`Hapus ${channel.name}`}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/60 hover:text-red-600 dark:hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredChannels.length === 0 && (
                <div className="p-12 text-center">
                  <Radio
                    size={32}
                    className="mx-auto mb-3 text-slate-300 dark:text-slate-700"
                  />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Belum ada saluran
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {channels.length === 0
                      ? "Tambahkan saluran pertama kamu menggunakan tombol di atas."
                      : "Coba ubah kata kunci atau filter platform."}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
            Menampilkan {filteredChannels.length} dari {channels.length} saluran
          </div>
        </section>
      </div>
    </div>
  );
}