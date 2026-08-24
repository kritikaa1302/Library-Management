import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { showToast } from '../../components/Toast';
import { FaBookOpen, FaEye, FaEyeSlash, FaShieldAlt, FaUser } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo"><FaBookOpen /></div>
          <h1 className="gradient-text">LibraSphere</h1>
          <p>Sign in to continue</p>
        </div>
        <div className="role-tabs">
          <button type="button" className={`role-tab ${role === 'user' ? 'active' : ''}`} onClick={() => { setRole('user'); setEmail('reader@library.com'); setPassword('Reader@123'); }}><FaUser /> Reader</button>
          <button type="button" className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => { setRole('admin'); setEmail('admin@library.com'); setPassword('Admin@123'); }}><FaShieldAlt /> Admin</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="password-field">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
        <div className="auth-footer">
          <Link to="/signup">Create account</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
