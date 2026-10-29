import { useState } from "react";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

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

  return (
    <main className=" relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 bg-linear-to-br from-pink-400 via-purple-300 to-blue-500">
      <div className="bg-pink-300/40 pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-blue-300/40 pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[120px]" />

      {/* Ditambahkan border border-pink-200/50 dark:border-white/10 agar sama persis dengan Login */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-pink-200/50 dark:border-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2 bg-white/90 dark:bg-slate-900/90">
        {/* Left Panel */}
        <section className="bg-gradient-to-br from-pink-500 to-blue-600 text-white relative hidden flex-col justify-between overflow-hidden p-10 md:flex">
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
            <span className="inline-flex rounded-full border border-pink-300/30 px-4 py-1.5 text-xs font-medium bg-white/10 backdrop-blur-md">
              YOUR SPACE. YOUR RULES.
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Mulai perjalananmu sebagai kreator handal.
            </h1>

            <p className="max-w-sm leading-7 text-pink-50/90">
              Buat akunmu sekarang dan nikmati kemudahan mengelola seluruh kontenmu dalam satu dashboard.
            </p>
          </div>

          <p className="relative text-xs text-pink-100/80">
            © 2026 Kreator Konten.
          </p>
        </section>

        {/* Right Panel */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white dark:bg-slate-900">
          <Card className="w-full p-6 sm:p-8 border-none shadow-none bg-transparent">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl md:hidden bg-pink-100 text-pink-600">
                <Sparkles size={24} />
              </div>

              <p className="text-sm font-medium text-pink-600">
                GET STARTED
              </p>

              <CardTitle className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                Create an account
              </CardTitle>

              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Lengkapi data di bawah untuk mendaftarkan akun baru.
              </p>
            </CardHeader>

            <CardContent className="px-0 pt-6">
              <form className="space-y-4">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama kamu"
                    autoComplete="name"
                    required
                    className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    required
                    className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      autoComplete="new-password"
                      required
                      className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">
                    Konfirmasi Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      autoComplete="new-password"
                      required
                      className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pr-12 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full font-semibold transition bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white focus-visible:ring-pink-500/20"
                >
                  Buat Akun
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs text-slate-400 font-medium">OR</span>
                <Separator className="flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>

              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm text-center">
                Sudah memiliki akun?{" "}
                <a
                  href="/login"
                  className="font-semibold text-pink-600 hover:text-pink-700 transition"
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