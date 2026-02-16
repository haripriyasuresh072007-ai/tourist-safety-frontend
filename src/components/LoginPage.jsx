// src/components/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import RegisterPage from "./RegisterPage";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(form.email, form.password);
    if (!ok) {
      setError("Invalid credentials. Use admin@police.gov / 123456 for demo.");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
    <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl border border-slate-200 p-10 space-y-8">


        <h1 className="text-3xl font-extrabold text-blue-900 text-center">
          SafeTravel AI – Login
        </h1>
        <p className="text-center text-sm text-slate-600">
          Ranipet District Police Command Dashboard
        </p>

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FFFCF5]"
              placeholder="admin@police.gov"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FFFCF5]"
              placeholder="123456"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold py-3 shadow-lg hover:shadow-xl transition"
          >
            Enter dashboard
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          New tourist?{" "}
          <button
            type="button"
            onClick={() => setShowRegister(true)}
            className="font-semibold text-blue-700 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
