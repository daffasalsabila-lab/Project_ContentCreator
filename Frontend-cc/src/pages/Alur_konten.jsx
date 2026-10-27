import { useState } from "react";
import "../assets/pipeline.css";

const initialContents = [
  {
    id: 1,
    title: "Tips Belajar React JS untuk Pemula",
    format_type: "long_video",
    status: "scripting",
    priority: "high",
    scheduled_date: "2026-11-02",
    published_url: "",
  },
  {
    id: 2,
    title: "Review Tech Stack 2026",
    format_type: "short_video",
    status: "editing",
    priority: "medium",
    scheduled_date: "2026-10-30",
    published_url: "",
  },
  {
    id: 3,
    title: "Infografis Perbandingan Framework CSS",
    format_type: "carousel",
    status: "published",
    priority: "low",
    scheduled_date: "2026-10-25",
    published_url: "https://instagram.com/p/examp1e",
  },
];

const stages = ["idea", "scripting", "recording", "editing", "ready", "published"];
const formats = ["short_video", "long_video", "carousel", "single_post"];

export default function Alur_konten() {
  // PERBAIKAN: Menggunakan initialContents, bukan initialPipeline
  const [contents, setContents] = useState(initialContents);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("All");

  const filteredContents = contents.filter((item) => {
    const keyword = search.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(keyword);
    const matchesStage = filterStage === "All" || item.status === filterStage;
    return matchesSearch && matchesStage;
  });

  // Fungsi update status dengan validasi URL Publikasi (Sesuai TC-03 di PDF)
  const updateStatus = (id, newStatus) => {
    const target = contents.find((item) => item.id === id);

    if (newStatus === "published" && !target.published_url) {
      alert("Gagal! Kolom Published URL wajib diisi jika konten sudah tayang.");
      return;
    }

    setContents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const totalContents = contents.length;
  const publishedCount = contents.filter((i) => i.status === "published").length;
  const readyCount = contents.filter((i) => i.status === "ready").length;
  const inProgressCount = contents.filter(
    (i) => !["published", "ready", "idea"].includes(i.status)
  ).length;

  return (
    <div className="pipeline-page">
      <header className="pipeline-header">
        <div>
          <p className="pipeline-eyebrow">CREATOR CONTENT PIPELINE</p>
          <h1>Content Tracker</h1>
          <p className="pipeline-subtitle">
            Kelola ide, alur produksi, hingga publikasi konten media sosial kamu.
          </p>
        </div>

        <button
          className="pipeline-add-btn"
          onClick={() =>
            alert("Hubungkan tombol ini ke form tambah draf konten.")
          }
        >
          + Tambah Konten
        </button>
      </header>

      <section className="pipeline-stats">
        <div className="pipeline-stat-card">
          <span>Total Konten</span>
          <h2>{totalContents}</h2>
          <p>Semua ide & postingan</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Dalam Produksi</span>
          <h2>{inProgressCount}</h2>
          <p>Scripting / Recording / Editing</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Siap Unggah</span>
          <h2>{readyCount}</h2>
          <p>Status Ready</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Dipublikasi</span>
          <h2>{publishedCount}</h2>
          <p>Sudah tayang</p>
        </div>
      </section>

      <section className="pipeline-content">
        <div className="pipeline-toolbar">
          <div>
            <h2>Daftar Konten</h2>
            <p>Kelola seluruh alur siklus hidup konten.</p>
          </div>

          <div className="pipeline-filters">
            <input
              type="text"
              placeholder="Cari judul konten..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="All">Semua Status</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pipeline-table-wrapper">
          <table className="pipeline-table">
            <thead>
              <tr>
                <th>Judul Konten</th>
                <th>Format</th>
                <th>Prioritas</th>
                <th>Status Pipeline</th>
                <th>Jadwal Rilis</th>
                <th>URL Publikasi</th>
              </tr>
            </thead>

            <tbody>
              {filteredContents.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.title}</strong>
                    <small>ID #{item.id}</small>
                  </td>

                  <td>{item.format_type}</td>

                  <td>
                    <span className={`badge priority-${item.priority}`}>
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <select
                      className={`stage-select stage-${item.status}`}
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value)
                      }
                    >
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>{item.scheduled_date}</td>

                  <td>
                    {item.published_url ? (
                      <a href={item.published_url} target="_blank" rel="noreferrer">
                        Lihat Link
                      </a>
                    ) : (
                      <span style={{ color: "#999" }}>-</span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredContents.length === 0 && (
                <tr>
                  <td colSpan="6" className="pipeline-empty">
                    Tidak ada data konten yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pipeline-footer">
          Menampilkan {filteredContents.length} dari {contents.length} konten
        </div>
      </section>
    </div>
  );
}