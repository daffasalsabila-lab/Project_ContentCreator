// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";

import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Separator } from "../../components/ui/separator.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090f] px-4 py-10 text-white">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/0.3 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        {/* Left Panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-violet-600 via-purple-700 to-indigo-900 p-10 md:flex">
          <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border border-white/20" />
          <div className="absolute -right-10 top-40 h-48 w-48 rounded-full border border-white/20" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Sparkles size={22} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Kreator Konten
            </span>
          </div>

          <div className="relative space-y-6">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium">
              Mulai perjalananmu di sini!
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Bergabunglah dengan komunitas kreator kami
            </h1>

            <p className="max-w-sm leading-7 text-white/70">
              Buat akunmu dan mulai perjalanan baru untuk
              mengelola semua kebutuhanmu dalam satu tempat.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "Simple and intuitive dashboard",
                "Manage everything in one place",
                "Designed for your productivity",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                    <Check size={14} />
                  </div>

                  <span className="text-sm text-white/80">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-white/50">
            © 2026 Kreator Konten.
          </p>
        </section>

        {/* Right Panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <Card className="w-full border-0 bg-transparent text-white shadow-none">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 md:hidden">
                <Sparkles size={24} />
              </div>

              {/* <p className="text-sm font-medium tracking-widest text-violet-400">
                CREATE ACCOUNT
              </p> */}

              <CardTitle className="text-3xl font-bold tracking-tight text-violet-400">
                BUAT AKUN BARU
              </CardTitle>

              <p className="text-sm leading-6 text-white/50">
                Lengkapi data berikut untuk membuat akun baru.
              </p>
            </CardHeader>

            <CardContent className="px-0 pt-5">
              <form className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/80">
                    Nama Lengkap
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    // defaultValue={formData.name}
                    autoComplete="name"
                    required
                    className="h-11 border-white/10 bg-white/0.4
                    text-white placeholder:text-white/30 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Alamat Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    // defaultValue={formData.email}
                    autoComplete="email"
                    required
                    className="h-11 border-white/10 bg-white/04 text-white placeholder:text-white/30 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/80">
                    Kata Sandi
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      // defaultValue={formData.password}
                      autoComplete="new-password"
                      minLength={8}
                      required
                      className="h-11 border-white/10 bg-white/04 pr-11 text-white placeholder:text-white/30 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white/80"
                  >
                    Konfirmasi Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      // value={formData.confirmPassword}
                      autoComplete="new-password"
                      required
                      className="h-11 border-pink-400/20 bg-pink-400/20 pr-11 text-white placeholder:text-white/30 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 py-1 text-sm text-white/50">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-violet-500"
                  />

                  <span>
                    Saya menyetujui {" "}
                    <button
                      type="button"
                      className="text-violet-400 hover:text-violet-300"
                    >
                      Ketentuan Layanan 
                    </button>{" "}
                    dan{" "}
                    <button
                      type="button"
                      className="text-violet-400 hover:text-violet-300"
                    >
                      Kebijakan Privasi
                    </button>
                    .
                  </span>
                </label>

                {/* Submit */}
                <Button
                  type="submit"
                  // className="group h-11 w-full bg-violet-600 font-semibold text-white transition hover:bg-violet-500" onClick={() => navigate("/login")}
                >
                  Buat Akun
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Button>
              </form>

              <div className="my-5 flex items-center gap-4">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs text-white/40">OR</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              <p className="text-center text-sm text-white/50">
                Sudah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Masuk
                </a>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}