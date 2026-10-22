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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-[120px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl md:grid-cols-2">
        {/* Left Panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden p-10 md:flex">
          <div className="absolute -right-20 top-32 h-64 w-64 rounded-full border border-white/20" />
          <div className="absolute -right-10 top-42 h-48 w-48 rounded-full border border-white/20" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl">
              <Sparkles size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Contect Creator
            </span>
          </div>

          <div className="relative space-y-5">
            <span className="inline-flex rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium">
              YOUR SPACE. YOUR RULES.
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Everything starts with a single login.
            </h1>

            <p className="max-w-sm leading-7">
              Kelola pekerjaan, pantau aktivitas, dan akses semua
              kebutuhanmu dalam satu dashboard.
            </p>
          </div>

          <p className="relative text-xs">
            © 2026 NEXORA. All rights reserved.
          </p>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <Card className="w-full p-12">
            <CardHeader className="space-y-3 px-0">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl md:hidden">
                <Sparkles size={24} />
              </div>

              <p className="text-sm font-medium">
                WELCOME BACK
              </p>

              <CardTitle className="text-3xl font-bold tracking-tight">
                Sign in to your account
              </CardTitle>

              <p className="text-sm leading-6">
                Masukkan kredensial kamu untuk melanjutkan.
              </p>
            </CardHeader>

            <CardContent className="px-0 pt-6">
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    required
                    className="h-12 border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      Password
                    </Label>

                    <button
                      type="button"
                      className="text-xs transition"
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
                      className="h-12 border-white/10 pr-12 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition"
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
                  className="h-12 w-full font-semibold transition"
                >
                  Sign in
                </Button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-xs">
                  OR CONTINUE WITH
                </span>
                <Separator className="flex-1" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-12 w-full border-white/10"
              >
                Continue with GitHub
              </Button>

              <p className="mt-8 text-center text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="font-semibold"
                >
                  Create account
                </button>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}