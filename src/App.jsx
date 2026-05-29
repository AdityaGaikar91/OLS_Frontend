import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Courses from "./pages/admin/Courses.jsx";
import AddCourse from "./pages/admin/AddCourse.jsx";
import AddLecture from "./pages/admin/AddLecture.jsx";
import Instructors from "./pages/admin/Instructors.jsx";
import AllLectures from "./pages/admin/AllLectures.jsx";
import MyLectures from "./pages/instructor/MyLectures.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/courses/add" element={<AddCourse />} />
          <Route path="/admin/lectures/add" element={<AddLecture />} />
          <Route path="/admin/instructors" element={<Instructors />} />
          <Route path="/admin/lectures" element={<AllLectures />} />
        </Route>

        <Route element={<ProtectedRoute role="instructor" />}>
          <Route path="/instructor/lectures" element={<MyLectures />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}