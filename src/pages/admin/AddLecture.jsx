import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

export default function AddLecture() {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    courseId: searchParams.get("courseId") || "",
    instructorId: "",
    date: "",
    batchName: "",
    topic: "",
  });

  useEffect(() => {
    api.get("/courses").then((r) => setCourses(r.data));
    api.get("/users/instructors").then((r) => setInstructors(r.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.courseId || !form.instructorId || !form.date || !form.batchName) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/lectures", form);
      toast.success("Lecture scheduled successfully!");
      setForm({ courseId: "", instructorId: "", date: "", batchName: "", topic: "" });
    } catch (err) {
      // 409 = clash
      toast.error(err.response?.data?.message || "Failed to schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-2 text-slate-800">Schedule a Lecture</h2>
      <p className="text-sm text-slate-500 mb-6">
        The system will automatically prevent scheduling clashes.
      </p>
      <div className="space-y-4">
        <select
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
        >
          <option value="">Select Course *</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.level})
            </option>
          ))}
        </select>

        <select
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.instructorId}
          onChange={(e) => setForm({ ...form, instructorId: e.target.value })}
        >
          <option value="">Select Instructor *</option>
          {instructors.map((i) => (
            <option key={i._id} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          placeholder="Batch Name e.g. Batch A, Morning Batch *"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.batchName}
          onChange={(e) => setForm({ ...form, batchName: e.target.value })}
        />

        <input
          placeholder="Topic (optional)"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? "Scheduling..." : "Schedule Lecture"}
        </button>
      </div>
    </div>
  );
}
