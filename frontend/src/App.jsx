import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import Attendance from './pages/Attendance';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Default Route: Redirects localhost:5173/ directly to Login */}
        <Route path="/" element={<Navigate to="/Login" />} />

        {/* Auth Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/attendance" element={<Attendance />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  )
}
export default App;