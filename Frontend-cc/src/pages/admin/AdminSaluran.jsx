import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Globe,
    CheckCircle2,
    Radio,
    Loader2,
    Trash2,
    Pencil,
    ExternalLink,
    X,
    Sparkles,
    AlertCircle,
} from "lucide-react";
import contentService from "../../services/contentService.js";

const platformBadgeColors = {
    instagram:
        "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-200 dark:border-rose-900",
    youtube:
        "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 border-red-200 dark:border-red-900",
    tiktok:
        "bg-slate-900 dark:bg-slate-800 text-white border-slate-700 dark:border-slate-700",
    linkedin:
        "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900",
};

const formatNumber = (number = 0) =>
    new Intl.NumberFormat("id-ID").format(number);

export default function AdminSaluran() {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [platformFilter, setPlatformFilter] = useState("Semua");
    const [showModal, setShowModal] = useState(false);
    const [editingChannel, setEditingChannel] = useState(null);

    const [newHandleName, setNewHandleName] = useState("");
    const [newPlatform, setNewPlatform] = useState("Instagram");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let active = true;

        const fetchChannels = async () => {
            try {
                const response = await contentService.getChannels();
                const data = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data)
                        ? response.data
                        : Array.isArray(response?.data?.channels)
                            ? response.data.channels
                            : Array.isArray(response?.channels)
                                ? response.channels
                                : null;

                if (!data) {
                    throw new Error("Format data saluran tidak sesuai.");
                }
                if (active) setChannels(data);
            } catch (error) {
                console.error(
                    "Gagal mengambil data saluran:",
                    error.response?.data || error.message
                );
                if (active) setChannels([]);
            } finally {
                if (active) setLoading(false);
            }
        };

        void fetchChannels();
        return () => {
            active = false;
        };
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
            channel.handle_name?.toLowerCase().includes(keyword) ||
            channel.username?.toLowerCase().includes(keyword);

        const matchesPlatform =
            platformFilter === "Semua" ||
            channel.platform?.toLowerCase() === platformFilter.toLowerCase();

        return matchesSearch && matchesPlatform;
    });

    async function addChannel(event) {
        event.preventDefault();

        const trimmedHandle = newHandleName.trim();

        if (!trimmedHandle) {
            setFormError("Handle name wajib diisi.");
            return;
        }

        setFormError("");
        setIsSubmitting(true);

        const formattedHandle = trimmedHandle.startsWith("@")
            ? trimmedHandle
            : `@${trimmedHandle}`;

        const newChannelData = {
            handle_name: formattedHandle,
            platform: newPlatform.toLowerCase(),
        };

        try {
            if (editingChannel) {
                await contentService.updateChannel(editingChannel.id, newChannelData);
                setChannels((prev) =>
                    prev.map((channel) =>
                        channel.id === editingChannel.id
                            ? { ...channel, ...newChannelData }
                            : channel
                    )
                );
            } else {
                const response = await contentService.createChannel(newChannelData);
                const createdChannel = response.data || response;

                if (!createdChannel?.id) {
                    throw new Error("Respons server tidak berisi data saluran.");
                }

                setChannels((prev) => [...prev, createdChannel]);
            }

            // Reset form dan tutup modal
            setNewHandleName("");
            setNewPlatform("Instagram");
            setShowModal(false);
            setEditingChannel(null);
        } catch (error) {
            console.error("Gagal menambahkan saluran ke server:", error);
            setFormError(
                error.response?.data?.message ||
                error.message ||
                "Terjadi kesalahan saat menyimpan ke server."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function closeModal() {
        setShowModal(false);
        setFormError("");
        setNewHandleName("");
        setNewPlatform("Instagram");
        setEditingChannel(null);
    }

    function openEditModal(channel) {
        setEditingChannel(channel);
        setNewHandleName(channel.handle_name || "");
        setNewPlatform(
            `${channel.platform?.charAt(0).toUpperCase() || ""}${channel.platform?.slice(1) || ""}`
        );
        setFormError("");
        setShowModal(true);
    }

    async function removeChannel(id) {
        const confirmed = window.confirm(
            "Yakin ingin menghapus saluran ini?"
        );

        if (confirmed) {
            try {
                await contentService.deleteChannel(id);
                setChannels((prev) =>
                    prev.filter((channel) => channel.id !== id)
                );
            } catch (error) {
                console.error("Gagal menghapus saluran:", error.response?.data || error);
                window.alert(
                    error.response?.data?.message || "Gagal menghapus saluran dari server."
                );
            }
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-50 p-4 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-pink-400/20 blur-[140px] dark:bg-pink-900/10" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-blue-400/20 blur-[140px] dark:bg-blue-900/10" />

            <div className="relative z-10">
                <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-pink-200/40 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
                            <Sparkles size={14} />
                            Social Channels Manager
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 sm:text-3xl">
                            Saluran (Channels)
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Kelola semua akun media sosial dan tautan analitik dalam satu tempat.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setEditingChannel(null);
                            setNewHandleName("");
                            setNewPlatform("Instagram");
                            setShowModal(true);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
                    >
                        <Plus size={19} />
                        Tambah Saluran
                    </button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Total Saluran
                            </p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400">
                                <Radio size={20} />
                            </div>
                        </div>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {channels.length}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                            Semua platform terdaftar
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Saluran Terhubung
                            </p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                                <CheckCircle2 size={20} />
                            </div>
                        </div>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {connected}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                            Siap untuk analitik
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:col-span-2 xl:col-span-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Total Pengikut
                            </p>
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                                <Globe size={20} />
                            </div>
                        </div>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {formatNumber(totalFollowers)}
                        </h2>
                        <p className="mt-2 text-xs text-slate-400">
                            Akumulasi seluruh pengikut
                        </p>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                        <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                                    {editingChannel ? "Edit Saluran" : "Tambah Saluran Baru"}
                                </h2>

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    aria-label="Tutup modal"
                                    className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {formError && (
                                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/60 dark:text-red-400">
                                    <AlertCircle size={18} />
                                    <span>{formError}</span>
                                </div>
                            )}

                            <form onSubmit={addChannel} className="mt-6 space-y-4">
                                <div>
                                    <label
                                        htmlFor="channel-handle"
                                        className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400"
                                    >
                                        Handle Name
                                    </label>
                                    <input
                                        id="channel-handle"
                                        required
                                        value={newHandleName}
                                        onChange={(event) => setNewHandleName(event.target.value)}
                                        placeholder="Contoh: @techcreator"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="channel-platform"
                                        className="mb-1 block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400"
                                    >
                                        Pilih Platform
                                    </label>
                                    <select
                                        id="channel-platform"
                                        value={newPlatform}
                                        onChange={(event) => setNewPlatform(event.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-pink-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                                    >
                                        <option value="Instagram">Instagram</option>
                                        <option value="YouTube">YouTube</option>
                                        <option value="TikTok">TikTok</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                    </select>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-50"
                                    >
                                        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                                        {editingChannel ? "Simpan Perubahan" : "Simpan Saluran"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 dark:border-slate-800 md:flex-row md:items-center">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                                Daftar Saluran
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Pantau status dan tautan akun yang kamu kelola.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-800">
                                <Search size={18} className="text-slate-400" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Cari handle name..."
                                    className="min-w-0 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
                                />
                            </div>

                            <select
                                value={platformFilter}
                                onChange={(event) => setPlatformFilter(event.target.value)}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
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
                            <Loader2 className="mr-2 animate-spin" size={24} />
                            <span>Memuat data saluran...</span>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredChannels.map((channel) => {
                                const badgeStyle =
                                    platformBadgeColors[channel.platform?.toLowerCase()] ||
                                    "bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900";

                                return (
                                    <div
                                        key={channel.id}
                                        className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider ${badgeStyle}`}
                                            >
                                                {channel.platform}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                                        {channel.handle_name || channel.username}
                                                    </h3>

                                                    {channel.url && (
                                                        <a
                                                            href={channel.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="Kunjungi Tautan"
                                                            aria-label={`Buka tautan ${channel.handle_name}`}
                                                            className="text-slate-400 transition hover:text-pink-600 dark:hover:text-pink-400"
                                                        >
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-6 md:justify-end">
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(channel)}
                                                title="Edit saluran"
                                                aria-label={`Edit ${channel.handle_name}`}
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeChannel(channel.id)}
                                                title="Hapus saluran"
                                                aria-label={`Hapus ${channel.handle_name}`}
                                                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:text-red-400"
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

                    <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        Menampilkan {filteredChannels.length} dari {channels.length} saluran
                    </div>
                </section>
            </div>
        </div>
    );
}