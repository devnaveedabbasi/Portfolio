"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AdminLogin() {
  const router = useRouter();
  const { isLoggedIn, login } = useAuthStore();
  const selectedColor = useSelector(
    (state: RootState) => state.color.selectedColor,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate delay for better UX
    setTimeout(() => {
      if (login(email, password)) {
        router.push("/admin");
      } else {
        setError("Invalid email or password");
        setPassword("");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Admin <span style={{ color: selectedColor }}>Panel</span>
          </h1>
          <p className="text-gray-400">Login to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-xl">
            {/* Email Field */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Icon
                  icon="mdi:email"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  required
                  className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-4 text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-semibold text-gray-300">
                Password
              </label>
              <div className="relative">
                <Icon
                  icon="mdi:lock"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg bg-gray-800 py-3 pl-10 pr-10 text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                >
                  <Icon
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                    width={20}
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-red-500/20 p-4 text-red-400">
                <Icon icon="mdi:alert-circle" width={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-3 font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
              style={{
                backgroundColor: selectedColor,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon icon="eos-icons:loading" width={20} />
                  Logging in...
                </span>
              ) : (
                "Login to Admin Panel"
              )}
            </button>
          </div>

          {/* Info Card */}
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
            <p className="text-sm text-gray-400">
              Demo credentials provided for testing
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Admin Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
