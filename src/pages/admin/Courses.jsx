import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const { data } = await api.get("/courses");
    setCourses(data);
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Courses</h2>
        <Link
          to="/admin/courses/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          + Add Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <p className="text-slate-500">No courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl shadow p-5">
              {c.image && (
                <img
                  src={`http://localhost:8000/${c.image}`}
                  alt={c.name}
                  className="w-full h-36 object-cover rounded-xl mb-4"
                />
              )}
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {c.level}
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-3">{c.name}</h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{c.description}</p>
              <div className="flex gap-3 mt-4">
                <Link
                  to={`/admin/lectures/add?courseId=${c._id}`}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  + Schedule Lecture
                </Link>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-xs text-red-500 font-semibold hover:underline ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
