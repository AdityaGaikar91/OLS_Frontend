import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    api.get("/users/instructors").then((r) => setInstructors(r.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Instructors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {instructors.map((i) => (
          <div key={i._id} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
              {i.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{i.name}</p>
              <p className="text-sm text-slate-400">{i.email}</p>
              <span className="text-xs text-green-600 font-semibold mt-1 inline-block capitalize">
                {i.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
