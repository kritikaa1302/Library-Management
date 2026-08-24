import { useState, useEffect } from 'react';
import { getAllUsers, toggleBlockUser } from '../../api/userApi';
import { showToast } from '../../components/Toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (err) {
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (userId) => {
    try {
      const { data } = await toggleBlockUser(userId);
      setUsers(prev => prev.map(u =>
        u._id === userId ? { ...u, isVerified: data.isVerified } : u
      ));
      showToast(`User ${data.isVerified ? 'unblocked' : 'blocked'}`, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Action failed', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="gradient-text">User Management</h2>
      <div className="glass-table">
        <table>
          <thead>
            <tr><th></th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td><img src={u.avatar} alt="avatar" width="36" style={{ borderRadius: '50%', border: '2px solid var(--primary)' }} /></td>
                <td><strong>{u.name}</strong></td>
                <td>{u.email}</td>
                <td><span style={{ background: 'var(--primary-soft)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>{u.role}</span></td>
                <td><span style={{ color: u.isVerified ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{u.isVerified ? '● Active' : '● Blocked'}</span></td>
                <td>
                  {u.role !== 'admin' ? (
                    <button className="btn-outline" onClick={() => handleToggle(u._id)}>
                      {u.isVerified ? 'Block' : 'Unblock'}
                    </button>
                  ) : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}