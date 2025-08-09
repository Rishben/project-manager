# 🚀 ProjX: A MERN Stack Project Management Tool

ProjX helps teams organize and track their work better.  
Users can create workspaces, add projects, and break them down into tasks and subtasks to keep everything on track.  
It includes a comment feature where teammates can tag each other and chat within tasks, plus a Kanban board to visualize progress.  
The dashboard gives a clear view of project status, helping users analyze how things are going.  
Secure token-based login keeps the app safe and private.

---
🌐 **Live Demo:** [https://project-manager-g042.onrender.com](https://project-manager-g042.onrender.com)

## 📽️ Watch the Demo Video

[![Watch the Demo Video](https://github.com/user-attachments/assets/d37c23e6-99c7-42e9-8b41-f08ca63d2104)](https://drive.google.com/file/d/1w3leEmlX57QpOiZ12mF5ZVO2GcldG6Ii/view?usp=sharing)

## 🛠️ Tech Stack & Dependencies

### Frontend (React + Vite)
Some important libraries used:

- ⚛️ `react`, `react-dom`, `react-router-dom` (routing)  
- 📝 `react-hook-form` (forms)  
- 🎛️ `@radix-ui/*` (UI components like dialogs, checkboxes, dropdowns)  
- 🎨 `tailwindcss` & `@tailwindcss/vite` (styling)  
- 🎞️ `framer-motion` (animations)  
- 🌐 `axios` (API calls)  
- 📅 `date-fns` (date handling)  
- ✅ `zod` (validation)  
- 🗨️ `react-mentions` (tagging teammates)  
- 📊 `recharts` (charts for dashboard)  

Plus some helpers like `clsx`, `tailwind-merge`, and `sonner` for UI polish.

### Backend (Node.js + Express + MongoDB)
Key dependencies:

- 📡 `express` (server)  
- 🗄️ `mongoose` (MongoDB ODM)  
- 🔒 `bcrypt` (password hashing)  
- 🔑 `jsonwebtoken` (auth tokens)  
- 🌍 `cors` (cross-origin requests)  
- 🔧 `dotenv` (env variables)  
- 📋 `morgan` (logging)  
- ✉️ `@sendgrid/mail` (email service)  
- ✅ `zod` + `zod-express-middleware` (validation)

---

## ⚡ How to Run

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/projx.git

cd projx
```

### 2. Frontend

```bash
cd frontend

npm install

npm run dev
```

### 3. Backend

```bash
cd backend

npm install

npm run start
```

### 4. Sample Frontend .env file
- VITE_API_URI=http://localhost:3000

### 5. Sample Backend .env file
- ARCJET_ENV=development
- ARCJET_KEY=sample-arcjet-key-123456789
- FROM_EMAIL=admin@example.com
- FRONTEND_URL=http://localhost:5173
- JWT_SECRET=your_jwt_secret_here
- MONGODB_URI=mongodb://localhost:27017/projx
- PORT=3000
- SEND_GRID_API=sample-sendgrid-api-key-123456789

## 📬 Contact

Created by [Paiavulla Nikhil](https://github.com/Rishben) — feel free to reach out!
  
