
import { useState } from "react";
import {
  Plus,
  Search,
  Music2,
  Globe,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Radio,
} from "lucide-react";

const initialChannels = [
  {
    id: 1,
    name: "Instagram Bisnis",
    username: "@bisnisku.id",
    platform: "Instagram",
    status: "Terhubung",
    followers: 12500,
    posts: 48,
  },
  {
    id: 2,
    name: "YouTube Official",
    username: "@bisniskuofficial",
    platform: "YouTube",
    status: "Terhubung",
    followers: 8200,
    posts: 24,
  },
  {
    id: 3,
    name: "Facebook Page",
    username: "Bisnisku Indonesia",
    platform: "Facebook",
    status: "Terhubung",
    followers: 5600,
    posts: 36,
  },
  {
    id: 4,
    name: "TikTok Bisnis",
    username: "@bisnisku",
    platform: "TikTok",
    status: "Perlu koneksi",
    followers: 0,
    posts: 0,
  },
];

const platformIcons = {
  TikTok: Music2,
  Website: Globe,
};

const formatNumber = (number) =>
  new Intl.NumberFormat("id-ID").format(number);

export default function Channel() {
  const [channels, setChannels] = useState(initialChannels);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPlatform, setNewPlatform] = useState("Instagram");

  const connected = channels.filter(
    (channel) => channel.status === "Terhubung"
  ).length;

  const totalFollowers = channels.reduce(
    (total, channel) => total + channel.followers,
    0
  );

  const filteredChannels = channels.filter((channel) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      channel.name.toLowerCase().includes(keyword) ||
      channel.username.toLowerCase().includes(keyword);

    const matchesPlatform =
      platformFilter === "Semua" ||
      channel.platform === platformFilter;

    return matchesSearch && matchesPlatform;
  });

  function addChannel(event) {
    event.preventDefault();

    if (!newName.trim() || !newUsername.trim()) return;

    const channel = {
      id: Date.now(),
      name: newName.trim(),
      username: newUsername.trim(),
      platform: newPlatform,
      status: "Perlu koneksi",
      followers: 0,
      posts: 0,
    };

    setChannels((prev) => [...prev, channel]);
    setNewName("");
    setNewUsername("");
    setNewPlatform("Instagram");
    setShowForm(false);
  }

  function removeChannel(id) {
    const confirmed = window.confirm(
      "Yakin ingin menghapus saluran ini?"
    );

    if (confirmed) {
      setChannels((prev) =>
        prev.filter((channel) => channel.id !== id)
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Manajemen Konten
          </p>

          <h1 className="text-3xl font-bold text-slate-900">
            Saluran
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Kelola semua akun media sosial dalam satu tempat.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={19} />
          Tambah Saluran
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Saluran</p>
            <Radio className="text-indigo-600" size={21} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            {channels.length}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Semua platform
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Saluran Terhubung</p>
            <CheckCircle2 className="text-emerald-600" size={21} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            {connected}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Siap dikelola
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Pengikut</p>
            <Globe className="text-violet-600" size={21} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            {formatNumber(totalFollowers)}
          </h2>
          <p className="mt-2 text-xs text-slate-400">
            Akumulasi data dummy
          </p>
        </div>
      </div>

      {/* Add Channel Form */}
      {showForm && (
        <form
          onSubmit={addChannel}
          className="mb-8 rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Tambah Saluran Baru
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <input
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nama saluran"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <input
              required
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Username atau nama akun"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <select
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option>Instagram</option>
              <option>YouTube</option>
              <option>Facebook</option>
              <option>TikTok</option>
              <option>Website</option>
            </select>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
            >
              Simpan Saluran
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Channel List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Saluran
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Pantau status akun yang kamu kelola.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari saluran..."
                className="min-w-0 py-2.5 text-sm outline-none"
              />
            </div>

            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none"
            >
              <option value="Semua">Semua Platform</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Website">Website</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredChannels.map((channel) => {
            const PlatformIcon =
              platformIcons[channel.platform] || Globe;

            const isConnected = channel.status === "Terhubung";

            return (
              <div
                key={channel.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <PlatformIcon size={24} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {channel.name}
                    </h3>
                    <p className="mt-1 truncate text-sm text-slate-500">
                      {channel.platform} · {channel.username}
                    </p>
                  </div>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isConnected
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {isConnected ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    {channel.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-5 md:w-48">
                  <div>
                    <p className="text-xs text-slate-400">
                      Pengikut
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {formatNumber(channel.followers)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Konten
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {channel.posts}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeChannel(channel.id)}
                  title="Hapus saluran"
                  aria-label={`Hapus ${channel.name}`}
                  className="self-end rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 md:self-auto"
                >
                  <MoreHorizontal size={21} />
                </button>
              </div>
            );
          })}

          {filteredChannels.length === 0 && (
            <div className="p-12 text-center">
              <Radio
                size={32}
                className="mx-auto mb-3 text-slate-300"
              />
              <p className="font-semibold text-slate-700">
                Saluran tidak ditemukan
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Coba ubah kata kunci atau filter platform.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
          Menampilkan {filteredChannels.length} dari {channels.length} saluran
        </div>
      </section>
    </div>
  );
}
