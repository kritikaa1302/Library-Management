import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBooks } from '../../hooks/useBooks';
import { useBorrow } from '../../hooks/useBorrow';
import StatCard from '../../components/StatCard';
import { getAnnouncements } from '../../api/announcementApi';

export default function UserDashboard() {
  const { user } = useAuth();
  const { books } = useBooks();
  const { borrows } = useBorrow();
  const [announcements, setAnnouncements] = useState([]);

  const activeBorrows = borrows.filter(b => b.status === 'borrowed').length;
  const wishCount = user?.wishlist?.length || 0;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Unable to load announcements', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h2 className="gradient-text" style={{ marginBottom: '1.5rem' }}>
        Hello, {user?.name?.split(' ')[0]} 👋
      </h2>
      <div className="stats-grid">
        <StatCard icon="fa-book-open" value={books.length} label="Books Available" />
        <StatCard icon="fa-hand-holding-heart" value={activeBorrows} label="Currently Borrowed" />
        <StatCard icon="fa-heart" value={wishCount} label="Wishlist Items" />
      </div>
      <section className="glass-card announcements-card">
        <h3><i className="fas fa-bullhorn" style={{ color: 'var(--primary)' }}></i> Library announcements</h3>
        {announcements.length > 0 ? (
          <ul className="announcements-list">
            {announcements.map((announcement) => (
              <li key={announcement._id}>
                <div>
                  <strong>{announcement.title}</strong>
                  <p>{announcement.content}</p>
                </div>
                <time dateTime={announcement.createdAt}>
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-announcements">No announcements yet.</p>
        )}
      </section>
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3><i className="fas fa-robot" style={{ color: 'var(--primary)' }}></i> Recommended for you</h3>
        <div className="book-grid">
          {books.slice(0, 3).map(book => (
            <div key={book._id} className="book-card">
              <img src={book.coverImage} alt={book.title} className="book-cover" />
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
