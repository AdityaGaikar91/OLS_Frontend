import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      data.user.role === "admin"
        ? navigate("/admin/courses")
        : navigate("/instructor/lectures");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-slate-800 text-center">
          Lecture Scheduler
        </h1>
        <p className="text-center text-slate-500 text-sm mb-8">
          Sign in to continue
        </p>
        <div className="space-y-4">
          <input
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        {/* <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500">
          <p className="font-semibold mb-1">Demo credentials:</p>
          <p>Admin: admin@test.com / admin123</p>
          <p>Instructor: rahul@test.com / pass123</p>
          <p className="mt-2 text-slate-400">
            Hit POST /api/auth/seed first to populate demo data.
          </p>
        </div> */}
      </div>
    </div>
  );
}
