import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

export default function AddCourse() {
  const [form, setForm] = useState({ name: "", level: "Beginner", description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("level", form.level);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      const course = await api.post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Course created!");
      navigate(`/admin/lectures/add?courseId=${course.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
      <h2 className="text-xl font-bold mb-6 text-slate-800">Add New Course</h2>
      <div className="space-y-4">
        <input
          placeholder="Course Name"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <textarea
          placeholder="Description"
          rows={4}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div>
          <label className="text-sm text-slate-600 font-medium mb-1 block">
            Course Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-slate-600"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </div>
  );
}
