# Online Lecture Scheduling Module

A full-stack web application designed for administrators to schedule lectures for instructors, ensuring no double-booking or scheduling conflicts occur on the same date. 

## 🚀 Live Demo
- **Frontend URL:** [https://ols-frontend-tau.vercel.app](https://ols-frontend-tau.vercel.app)
- **Backend API:** [https://ols-backend-fmjt.onrender.com/api](https://ols-backend-fmjt.onrender.com/api)

### 🔐 Demo Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` |
| **Instructor** | `rahul@test.com` | `pass123` |

---

## 🛠 Tech Stack
**Frontend:**
- React 18 (Vite)
- Tailwind CSS v4
- React Router DOM v6
- Axios & React Hot Toast

**Backend:**
- Node.js & Express.js (ES Modules)
- MongoDB Atlas (Mongoose)
- JSON Web Token (JWT) & bcryptjs
- Cloudinary (Image Hosting) & Multer

---

## 🌟 Key Features
- **Role-Based Access Control:** Distinct views and permissions for Admins and Instructors.
- **Clash Prevention:** The system automatically validates dates and blocks admins from assigning an instructor to multiple lectures on the exact same date.
- **Past Date Restriction:** Lectures can only be scheduled for today or future dates.
- **Cloudinary Integration:** Course images are securely uploaded and served globally via Cloudinary's CDN.

---

## 🌐 Frontend Routes (React Router)
The frontend utilizes a protected routing system based on user roles.

| Route | Access | Description |
| :--- | :--- | :--- |
| `/login` | Public | Login page for both Admins and Instructors. |
| `/admin/courses` | Admin | View all available courses and delete them. |
| `/admin/courses/add` | Admin | Create a new course with an image upload. |
| `/admin/lectures` | Admin | View all scheduled lectures across all courses. |
| `/admin/lectures/add` | Admin | Schedule a lecture and assign an instructor. |
| `/admin/instructors` | Admin | View a list of all instructors in the system. |
| `/instructor/lectures`| Instructor | View all lectures specifically assigned to the logged-in instructor. |

---

## 🔌 Backend API Endpoints (Express.js)
All API endpoints are prefixed with `/api`.

### 🔑 Authentication (`/api/auth`)
- `POST /login` - Authenticate user and return JWT.

### 📚 Courses (`/api/courses`)
- `GET /` - Get all courses (Requires Auth).
- `POST /` - Create a new course with image upload (Requires Admin).
- `DELETE /:id` - Delete a course (Requires Admin).

### 📅 Lectures (`/api/lectures`)
- `GET /` - Get all lectures globally (Requires Admin).
- `GET /course/:courseId` - Get all lectures for a specific course (Requires Auth).
- `GET /instructor` - Get all lectures assigned to the currently logged-in instructor (Requires Instructor).
- `POST /` - Schedule a new lecture with clash prevention (Requires Admin).

### 👥 Users & Instructors (`/api/users`)
- `GET /instructors` - Retrieve a list of all users with the role of `instructor` (Requires Admin).

---

## ⚙️ Environment Variables (.env)

### Backend (.env)
```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/...
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://ols-frontend-tau.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://ols-backend-fmjt.onrender.com/api
```
