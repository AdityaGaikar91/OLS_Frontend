import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminLinks = [
    { to: "/admin/courses", label: "Courses" },
    { to: "/admin/courses/add", label: "Add Course" },
    { to: "/admin/lectures/add", label: "Schedule Lecture" },
    { to: "/admin/lectures", label: "All Lectures" },
    { to: "/admin/instructors", label: "Instructors" },
  ];

  const instructorLinks = [
    { to: "/instructor/lectures", label: "My Lectures" },
  ];

  const links = user?.role === "admin" ? adminLinks : instructorLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-60 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-lg font-bold">Lecture Scheduler</h1>
        <p className="text-xs text-slate-400 mt-1 capitalize">{user?.role}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 mb-2">{user?.name}</p>
        <button
          onClick={handleLogout}
          className="w-full text-sm bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
