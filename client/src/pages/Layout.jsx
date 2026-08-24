import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle('dark');
  };

  const isAdmin = user?.role === 'admin';

  const navItems = isAdmin ? [
    { to: '/admin', label: 'Dashboard', icon: 'fa-chart-line' },
    { to: '/admin/books', label: 'Books', icon: 'fa-book' },
    { to: '/admin/users', label: 'Users', icon: 'fa-users' },
    { to: '/admin/borrows', label: 'Borrows', icon: 'fa-exchange-alt' },
    { to: '/admin/categories', label: 'Categories', icon: 'fa-tags' },
    { to: '/admin/announcements', label: 'Announcements', icon: 'fa-bullhorn' },
  ] : [
    { to: '/', label: 'Overview', icon: 'fa-tachometer-alt' },
    { to: '/explore', label: 'Explore', icon: 'fa-search' },
    { to: '/borrows', label: 'My Borrows', icon: 'fa-bookmark' },
    { to: '/wishlist', label: 'Wishlist', icon: 'fa-heart' },
    { to: '/profile', label: 'Profile', icon: 'fa-user-circle' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="logo-area">
          <div className="logo-icon"><i className="fas fa-layer-group"></i></div>
          <span className="logo-text">LibraSphere</span>
        </div>
        <span className="role-badge">
          <i className={isAdmin ? 'fa-shield-alt' : 'fa-user'}></i> {isAdmin ? 'ADMIN' : 'READER'}
        </span>
        <nav>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <i className={`fas ${item.icon}`}></i>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
          <div className="nav-item" onClick={toggleDark}>
            <i className="fas fa-moon"></i>
            <span className="nav-label">Dark mode</span>
          </div>
          <div className="nav-item" onClick={() => { logout(); navigate('/login'); }}>
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-label">Logout</span>
          </div>
        </nav>
      </aside>
      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title gradient-text">
            {isAdmin ? 'Admin Panel' : 'Library Dashboard'}
          </h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleDark}>
              <i className="fas fa-moon"></i> <span>{dark ? 'Light' : 'Dark'}</span>
            </button>
            <div className="admin-avatar">
              <img src={user?.avatar || ''} alt="avatar" />
              <span><strong>{user?.name?.split(' ')[0]}</strong><br /><small>{isAdmin ? 'Administrator' : 'Reader'}</small></span>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}