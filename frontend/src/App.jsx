import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./routes/auth/auth-layout";

// Auth pages
import { AuthProvider } from "./provider/auth-context";
import ReactQueryProvider from "./provider/react-query-provider";
import ForgotPassword from "./routes/auth/forgot-password";
import ResetPassword from "./routes/auth/reset-password";
import SignIn from "./routes/auth/sign-in";
import SignUp from "./routes/auth/sign-up";
import VerifyEmail from "./routes/auth/verify-email";
import Home from "./routes/root/home";

// // Dashboard pages
// import Dashboard from "./routes/dashboard/index";
// import Workspaces from "./routes/dashboard/workspaces/index";
// import WorkspaceDetails from "./routes/dashboard/workspaces/workspace-details";
// import ProjectDetails from "./routes/dashboard/project/project-details";
// import TaskDetails from "./routes/dashboard/task/task-details";
// import MyTasks from "./routes/dashboard/my-tasks";
// import Members from "./routes/dashboard/members";

// // User
// import UserProfile from "./routes/user/profile";

// // Standalone
// import WorkspaceInvite from "./routes/dashboard/workspaces/workspace-invite";

function App() {
  return (
    <BrowserRouter>
    <ReactQueryProvider>
      <AuthProvider>
        <Routes>
          {/* 🔓 Public Routes (Auth) */}
          <Route element={<AuthLayout />}>
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>
          {/* 
        🔐 Protected Routes (Dashboard)
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route
            path="workspaces/:workspaceId"
            element={<WorkspaceDetails />}
          />
          <Route
            path="workspaces/:workspaceId/projects/:projectId"
            element={<ProjectDetails />}
          />
          <Route
            path="workspaces/:workspaceId/projects/:projectId/tasks/:taskId"
            element={<TaskDetails />}
          />
          <Route path="my-tasks" element={<MyTasks />} />
          <Route path="members" element={<Members />} />
        </Route>

        🎟 Standalone route (e.g. shared invite link)
        <Route
          path="workspace-invite/:workspaceId"
          element={<WorkspaceInvite />}
        />

        👤 User-specific routes
        <Route element={<UserLayout />}>
          <Route path="user/profile" element={<UserProfile />} />
        </Route> */}
        </Routes>
      </AuthProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  );
}

export default App;
