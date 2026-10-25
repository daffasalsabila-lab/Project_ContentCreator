
import { useState } from "react";
import "../assets/pipeline.css";

const initialPipeline = [
  {
    id: 1,
    name: "PT Maju Bersama",
    contact: "Andi Saputra",
    stage: "Lead",
    value: 15000000,
    probability: 20,
    date: "2026-10-28",
  },
  {
    id: 2,
    name: "CV Digital Kreatif",
    contact: "Siti Rahma",
    stage: "Qualified",
    value: 25000000,
    probability: 40,
    date: "2026-10-30",
  },
  {
    id: 3,
    name: "PT Teknologi Nusantara",
    contact: "Budi Santoso",
    stage: "Proposal",
    value: 40000000,
    probability: 60,
    date: "2026-11-02",
  },
  {
    id: 4,
    name: "CV Solusi Mandiri",
    contact: "Dina Putri",
    stage: "Negotiation",
    value: 30000000,
    probability: 80,
    date: "2026-11-05",
  },
  {
    id: 5,
    name: "PT Global Indonesia",
    contact: "Rizky Pratama",
    stage: "Won",
    value: 50000000,
    probability: 100,
    date: "2026-10-20",
  },
];

const stages = [
  "Lead",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
];

const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Pipeline() {
  const [pipeline, setPipeline] = useState(initialPipeline);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("All");

  const filteredPipeline = pipeline.filter((item) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.contact.toLowerCase().includes(keyword);

    const matchesStage =
      filterStage === "All" || item.stage === filterStage;

    return matchesSearch && matchesStage;
  });

  const totalValue = pipeline.reduce(
    (total, item) =>
      item.stage !== "Lost" ? total + item.value : total,
    0
  );

  const wonDeals = pipeline.filter(
    (item) => item.stage === "Won"
  );

  const wonValue = wonDeals.reduce(
    (total, item) => total + item.value,
    0
  );

  const activeDeals = pipeline.filter(
    (item) => !["Won", "Lost"].includes(item.stage)
  );

  const updateStage = (id, stage) => {
    setPipeline((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stage,
              probability:
                stage === "Won"
                  ? 100
                  : stage === "Lost"
                  ? 0
                  : {
                      Lead: 20,
                      Qualified: 40,
                      Proposal: 60,
                      Negotiation: 80,
                    }[stage],
            }
          : item
      )
    );
  };

  return (
    <div className="pipeline-page">
      <header className="pipeline-header">
        <div>
          <p className="pipeline-eyebrow">SALES MANAGEMENT</p>
          <h1>Sales Pipeline</h1>
          <p className="pipeline-subtitle">
            Pantau prospek dan peluang penjualan kamu.
          </p>
        </div>

        <button
          className="pipeline-add-btn"
          onClick={() =>
            alert("Hubungkan tombol ini ke form tambah deal.")
          }
        >
          + Tambah Deal
        </button>
      </header>

      <section className="pipeline-stats">
        <div className="pipeline-stat-card">
          <span>Total Pipeline</span>
          <h2>{formatRupiah(totalValue)}</h2>
          <p>Semua deal selain Lost</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Deal Aktif</span>
          <h2>{activeDeals.length}</h2>
          <p>Peluang masih berjalan</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Deal Berhasil</span>
          <h2>{wonDeals.length}</h2>
          <p>Deal dengan status Won</p>
        </div>

        <div className="pipeline-stat-card">
          <span>Revenue Won</span>
          <h2>{formatRupiah(wonValue)}</h2>
          <p>Total deal berhasil</p>
        </div>
      </section>

      <section className="pipeline-content">
        <div className="pipeline-toolbar">
          <div>
            <h2>Daftar Peluang</h2>
            <p>Kelola seluruh peluang penjualan.</p>
          </div>

          <div className="pipeline-filters">
            <input
              type="text"
              placeholder="Cari perusahaan atau kontak..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="All">Semua Tahap</option>
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
                <th>Perusahaan</th>
                <th>Kontak</th>
                <th>Nilai Deal</th>
                <th>Tahap</th>
                <th>Probabilitas</th>
                <th>Target Closing</th>
              </tr>
            </thead>

            <tbody>
              {filteredPipeline.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>Deal #{item.id}</small>
                  </td>

                  <td>{item.contact}</td>

                  <td className="pipeline-value">
                    {formatRupiah(item.value)}
                  </td>

                  <td>
                    <select
                      className={`stage-select stage-${item.stage.toLowerCase()}`}
                      value={item.stage}
                      onChange={(e) =>
                        updateStage(item.id, e.target.value)
                      }
                    >
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <div className="probability-info">
                      <div className="probability-track">
                        <div
                          className="probability-fill"
                          style={{
                            width: `${item.probability}%`,
                          }}
                        />
                      </div>
                      <span>{item.probability}%</span>
                    </div>
                  </td>

                  <td>{item.date}</td>
                </tr>
              ))}

              {filteredPipeline.length === 0 && (
                <tr>
                  <td colSpan="6" className="pipeline-empty">
                    Tidak ada data pipeline yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pipeline-footer">
          Menampilkan {filteredPipeline.length} dari {pipeline.length} deal
        </div>
      </section>
    </div>
  );
}
