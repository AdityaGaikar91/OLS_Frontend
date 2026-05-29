import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function MyLectures() {
  const [lectures, setLectures] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/lectures/mine").then((r) => setLectures(r.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">My Lectures</h2>
      <p className="text-slate-500 text-sm mb-6">
        Welcome, {user?.name}. Here are all your scheduled lectures.
      </p>

      {lectures.length === 0 ? (
        <p className="text-slate-500">No lectures assigned to you yet.</p>
      ) : (
        <div className="space-y-4">
          {lectures.map((l) => (
            <div
              key={l._id}
              className="bg-white rounded-2xl shadow p-6 flex items-start gap-5"
            >
              <div className="min-w-16 text-center bg-blue-50 rounded-xl p-3">
                <p className="text-2xl font-bold text-blue-700">
                  {new Date(l.date).getDate()}
                </p>
                <p className="text-xs text-blue-500 font-semibold uppercase">
                  {new Date(l.date).toLocaleString("default", { month: "short" })}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(l.date).getFullYear()}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  {l.course?.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Batch: {l.batchName}
                </p>
                {l.topic && (
                  <p className="text-sm text-slate-400">Topic: {l.topic}</p>
                )}
                <span className="mt-2 inline-block text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                  {l.course?.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
