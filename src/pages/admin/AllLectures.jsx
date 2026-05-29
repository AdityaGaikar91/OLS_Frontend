import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

export default function AllLectures() {
  const [lectures, setLectures] = useState([]);

  const fetchLectures = async () => {
    const { data } = await api.get("/lectures");
    setLectures(data);
  };

  useEffect(() => { fetchLectures(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Remove this lecture?")) return;
    try {
      await api.delete(`/lectures/${id}`);
      toast.success("Lecture removed");
      fetchLectures();
    } catch {
      toast.error("Failed to remove");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Lectures</h2>
      {lectures.length === 0 ? (
        <p className="text-slate-500">No lectures scheduled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-left">
                <th className="px-5 py-4 font-semibold">Course</th>
                <th className="px-5 py-4 font-semibold">Batch</th>
                <th className="px-5 py-4 font-semibold">Instructor</th>
                <th className="px-5 py-4 font-semibold">Date</th>
                <th className="px-5 py-4 font-semibold">Topic</th>
                <th className="px-5 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {lectures.map((l) => (
                <tr key={l._id} className="border-t border-slate-100">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{l.course?.name}</p>
                    <p className="text-xs text-slate-400">{l.course?.level}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{l.batchName}</td>
                  <td className="px-5 py-4 text-slate-600">{l.instructor?.name}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {new Date(l.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-slate-500">{l.topic || "—"}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(l._id)}
                      className="text-xs text-red-500 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
