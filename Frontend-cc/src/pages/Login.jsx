import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 bg-linear-to-br from-pink-400 via-purple-300 to-blue-500">
      {/* Background Decoration */}
      <div className="bg-pink-300/50 pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-blue-300/50 pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-pink-200/30 shadow-2xl backdrop-blur-xl md:grid-cols-2 bg-white/80">
        {/* Left Panel */}
        <section className="bg-linear-to-br from-pink-500 to-blue-600 text-white relative hidden flex-col justify-between overflow-hidden p-10 md:flex">
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
              Everything starts with a single login.
            </h1>

            <p className="max-w-sm leading-7 text-pink-50/90">
              Kelola pekerjaan, pantau aktivitas, dan akses semua
              kebutuhanmu dalam satu dashboard.
            </p>
          </div>

          <p className="relative text-xs text-pink-100/80">
            ©  2026 Kreator Konten.
          </p>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-white">
          <Card className="w-full p-12 border-none shadow-none">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl md:hidden bg-pink-100 text-pink-600">
                <Sparkles size={24} />
              </div>

              <p className="text-sm font-medium text-pink-600">
                WELCOME BACK
              </p>

              <CardTitle className="text-3xl font-bold tracking-tight text-slate-800">
                Sign in to your account
              </CardTitle>

              <p className="text-sm leading-6 text-slate-500">
                Masukkan kredensial kamu untuk melanjutkan.
              </p>
            </CardHeader>

            <CardContent className="px-0 pt-6">
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    required
                    className="h-12 border-slate-200 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700">
                      Password
                    </Label>

                    <button
                      type="button"
                      className="text-xs transition text-pink-600 hover:text-pink-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-12 border-slate-200 pr-12 focus-visible:border-pink-500 focus-visible:ring-pink-500/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full font-semibold transition bg-gradient-to-r from-pink-500 to-blue-600 hover:from-pink-600 hover:to-blue-700 text-white focus-visible:ring-pink-500/20"
                >
                  Sign in
                </Button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1 bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">
                  OR CONTINUE WITH
                </span>
                <Separator className="flex-1 bg-slate-200" />
              </div>

              {/* <p className="mt-8 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <button 
                href="/register"
                  type="button"
                  className="font-semibold text-pink-600 hover:text-pink-700"
                >
                  Create account
                </button>
              </p> */}
              {/* tes dulu */}

              <p className="font-semibold text-pink-600 hover:text-pink-700">
                Belum memiliki akun?{" "}
                <a
                  href="/Register"
                  className="font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Buat akun
                </a>
              </p>

            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}