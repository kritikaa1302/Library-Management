import { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../../api/announcementApi';
import { showToast } from '../../components/Toast';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      showToast('Failed to load announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      showToast('Title and content required', 'error');
      return;
    }
    try {
      await createAnnouncement(title, content);
      setTitle('');
      setContent('');
      await fetchAnnouncements();
      showToast('Announcement sent!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this announcement?')) {
      try {
        await deleteAnnouncement(id);
        await fetchAnnouncements();
        showToast('Announcement deleted', 'success');
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed', 'error');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '650px' }}>
      <h3><i className="fas fa-bullhorn" style={{ color: 'var(--primary)' }}></i> Send Announcement</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', marginBottom: '0.5rem' }} />
        <textarea rows="3" placeholder="Write your announcement…" value={content} onChange={(e) => setContent(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }}></textarea>
        <button type="submit" className="btn-primary">📢 Broadcast to all users</button>
      </form>
      <div style={{ marginTop: '2rem' }}>
        <h4>Recent Announcements</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {announcements.map(a => (
            <li key={a._id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📢 <strong>{a.title}</strong> – {a.content}</span>
              <button className="btn-danger" onClick={() => handleDelete(a._id)}>Remove</button>
            </li>
          ))}
          {announcements.length === 0 && <li>No announcements yet.</li>}
        </ul>
      </div>
    </div>
  );
}