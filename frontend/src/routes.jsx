<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Pipeline from "./pages/Pipeline";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
=======
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
>>>>>>> main
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />

      <Route path="/jobs" element={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      } />

      <Route path="/pipeline" element={
        <ProtectedRoute>
          <Pipeline />
        </ProtectedRoute>
      } />

      <Route path="/resume" element={
        <ProtectedRoute>
          <Resume />
        </ProtectedRoute>
      } />

      <Route path="/interview" element={
        <ProtectedRoute>
          <Interview />
        </ProtectedRoute>
      } />

      <Route path="/analytics" element={
        <ProtectedRoute>
          <Analytics />
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
=======
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/jobs"
        element={<ProtectedRoute><Jobs /></ProtectedRoute>}
      />
>>>>>>> main
    </Routes>
  );
}
