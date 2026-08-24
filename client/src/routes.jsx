import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Layout from './pages/Layout';
import UserDashboard from './pages/user/UserDashboard';
import ExploreBooks from './pages/user/ExploreBooks';
import MyBorrows from './pages/user/MyBorrows';
import Wishlist from './pages/user/Wishlist';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBooks from './pages/admin/ManageBooks';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBorrows from './pages/admin/ManageBorrows';
import ManageCategories from './pages/admin/ManageCategories';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<UserDashboard />} />
        <Route path="explore" element={<ExploreBooks />} />
        <Route path="borrows" element={<MyBorrows />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />

        {/* Admin routes */}
        <Route path="admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="admin/books" element={
          <ProtectedRoute adminOnly>
            <ManageBooks />
          </ProtectedRoute>
        } />
        <Route path="admin/users" element={
          <ProtectedRoute adminOnly>
            <ManageUsers />
          </ProtectedRoute>
        } />
        <Route path="admin/borrows" element={
          <ProtectedRoute adminOnly>
            <ManageBorrows />
          </ProtectedRoute>
        } />
        <Route path="admin/categories" element={
          <ProtectedRoute adminOnly>
            <ManageCategories />
          </ProtectedRoute>
        } />
        <Route path="admin/announcements" element={
          <ProtectedRoute adminOnly>
            <ManageAnnouncements />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}