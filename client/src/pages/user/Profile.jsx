import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../api/userApi';
import { showToast } from '../../components/Toast';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleSave = async () => {
    try {
      const { data } = await updateProfile(name);
      updateUser(data);
      showToast('Profile updated!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  return (
    <div>
      <h2 className="gradient-text">Profile</h2>
      <div className="glass-card" style={{ padding: '2rem', maxWidth: '500px' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <img src={user?.avatar} alt="avatar" width={80} style={{ borderRadius: '50%', border: '3px solid var(--primary)' }} />
          <div>
            <h3>{user?.name}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
            <span className="role-badge"><i className="fas fa-user"></i> {user?.role}</span>
          </div>
        </div>
        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', margin: '8px 0 16px' }} />
        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
        <input value={user?.email} disabled style={{ width: '100%', margin: '8px 0 16px', opacity: 0.6 }} />
        <button className="btn-primary" onClick={handleSave}>Save changes</button>
      </div>
    </div>
  );
}