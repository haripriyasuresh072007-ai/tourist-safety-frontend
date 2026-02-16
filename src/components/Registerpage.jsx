// src/components/RegisterPage.jsx
import React, { useState } from "react";

export default function RegisterPage({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate success
    alert(`Registered ${form.name} (${form.email})`);
    if (onSwitchToLogin) onSwitchToLogin();
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
    <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl border border-slate-200 p-10 space-y-8">

        <h1 className="text-2xl font-extrabold text-blue-900 text-center">
          SafeTravel – Tourist Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Full name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FFFCF5]"
              placeholder="Tourist name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FFFCF5]"
              placeholder="tourist@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-[#E5DEC5] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FFFCF5]"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-800 to-blue-500 text-white font-bold py-3 shadow-lg hover:shadow-xl transition"
          >
            Create account
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already registered?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-blue-700 hover:underline"
          >
            Back to login
          </button>
        </p>
      </div>
    </div>
  );
}
