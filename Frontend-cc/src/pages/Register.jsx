import { useState } from "react";
import { Link } from "react-router-dom";

import { Eye, EyeOff, Sparkles } from "lucide-react";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("creator");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama.");
      return;
    }

    // Validasi minimal password
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || result.status === false) {
        setError(result.message || "Pendaftaran gagal. Silakan coba lagi.");
        return;
      }

      setSuccess(
        result.message || "Pendaftaran berhasil! Silakan masuk ke akunmu."
      );

      // Kosongkan form setelah berhasil
      setName("");
      setEmail("");
      setRole("creator");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error("Register error:", error);
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-purple-300 to-blue-500 px-4 py-10 transition-colors duration-300 dark:[background:radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] dark:from-slate-900 dark:via-slate-950 dark:to-black">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-300/50 blur-[120px] dark:bg-pink-950/30" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-300/50 blur-[120px] dark:bg-blue-950/30" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-pink-200/30 bg-white/90 shadow-2xl backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/95 md:grid-cols-2">

        {/* Panel Kiri */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-pink-500 to-blue-600 p-10 text-white dark:from-pink-950 dark:to-blue-950 md:flex">

          <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border border-pink-400/20" />

          <div className="absolute -right-10 top-42 h-48 w-48 rounded-full border border-pink-600/20" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
              <Sparkles size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Content Creator
            </span>
          </div>

          <div className="relative space-y-5">

            <span className="inline-flex rounded-full border border-pink-300/35 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-md">
              MULAI PERJALANAN KREATIFMU
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Waktunya Mengembangkan Ide Kreatifmu.
            </h1>

            <p className="max-w-sm leading-7 text-pink-50/90">
              Buat akunmu dan mulai kelola ide, jadwal, serta
              proses produksi konten dalam satu tempat.
            </p>

          </div>

          <p className="relative text-xs text-pink-100/80">
            © 2026 Content Creator.
          </p>

        </section>

        {/* Panel Kanan - Form Register */}
        <section className="flex items-center justify-center bg-white p-6 transition-colors duration-300 dark:bg-slate-900 sm:p-10 lg:p-14">

          <Card className="w-full border-none bg-transparent p-6 shadow-none sm:p-10">

            <CardHeader className="space-y-3 px-0">

              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 md:hidden">
                <Sparkles size={24} />
              </div>

              <p className="text-sm font-medium text-pink-600 dark:text-pink-400">
                BUAT AKUN BARU
              </p>

              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Bergabung dengan Content Creator
              </CardTitle>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Daftarkan dirimu untuk mulai mengelola konten
                dan saluran media sosialmu.
              </p>

            </CardHeader>

            <CardContent className="px-0 pt-6">

              <form onSubmit={handleRegister} className="space-y-4">

                {/* Nama Lengkap */}
                <div className="space-y-2">

                  <Label
                    htmlFor="name"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Nama Lengkap
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />

                </div>

                {/* Email */}
                <div className="space-y-2">

                  <Label
                    htmlFor="email"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Alamat Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Masukkan alamat email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                  />

                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label
                    htmlFor="role"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Daftar sebagai
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="h-12 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:border-pink-500 focus-visible:ring-2 focus-visible:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  >
                    <option value="creator">Creator</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>

                {/* Password */}
                <div className="space-y-2">

                  <Label
                    htmlFor="password"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Kata Sandi
                  </Label>

                  <div className="relative">

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      autoComplete="new-password"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-slate-200 bg-white pr-12 text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Konfirmasi Password */}
                <div className="space-y-2">

                  <Label
                    htmlFor="confirmPassword"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Konfirmasi Kata Sandi
                  </Label>

                  <div className="relative">

                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Masukkan kembali kata sandi"
                      autoComplete="new-password"
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 border-slate-200 bg-white pr-12 text-slate-900 placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Pesan Error */}
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                  </div>
                )}

                {/* Pesan Berhasil */}
                {success && (
                  <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
                    {success}
                  </div>
                )}

                {/* Tombol Register */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-12 w-full bg-gradient-to-r from-pink-500 to-blue-600 font-semibold text-white shadow-sm transition hover:from-pink-600 hover:to-blue-700 disabled:opacity-60"
                >
                  {loading ? "Sedang mendaftar..." : "Daftar Sekarang"}
                </Button>

              </form>

              {/* Link Login */}
              <div className="mt-6">

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sudah memiliki akun?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-pink-600 transition hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                  >
                    Masuk di sini
                  </Link>

                </p>

              </div>

            </CardContent>

          </Card>

        </section>

      </div>

    </main>
  );
}