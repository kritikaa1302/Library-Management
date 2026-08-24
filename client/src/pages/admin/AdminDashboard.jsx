import { useEffect, useMemo, useState } from 'react';
import { useBooks } from '../../hooks/useBooks';
import { useAuth } from '../../hooks/useAuth';
import { getAllUsers } from '../../api/userApi';
import { getAllBorrows } from '../../api/borrowApi';
import StatCard from '../../components/StatCard';
import Chart from '../../components/Chart';

export default function AdminDashboard() {
  const { books } = useBooks();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [borrows, setBorrows] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [usersResponse, borrowsResponse] = await Promise.all([getAllUsers(), getAllBorrows()]);
        setUsers(usersResponse.data);
        setBorrows(borrowsResponse.data);
      } catch (error) {
        console.error('Unable to load admin dashboard data', error);
      }
    };
    loadDashboardData();
  }, []);

  const stats = useMemo(() => ({
    totalBooks: books.length,
    totalUsers: users.length,
    activeBorrows: borrows.filter((borrow) => borrow.status === 'borrowed').length,
    returned: borrows.filter((borrow) => borrow.status === 'returned').length,
    lowStock: books.filter((book) => book.availableCopies < 3).length
  }), [books, users, borrows]);

  const chartData = {
    labels: ['Books', 'Active borrows', 'Returned', 'Low stock'],
    datasets: [{
      label: 'Library overview',
      data: [stats.totalBooks, stats.activeBorrows, stats.returned, stats.lowStock],
      backgroundColor: ['#ec489a', '#8b5cf6', '#10b981', '#f59e0b'],
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  const recentBorrows = borrows.slice(0, 4);
  const topBooks = [...books].sort((first, second) => second.ratings - first.ratings).slice(0, 4);

  return (
    <div className="admin-dashboard">
      <header className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">Library overview</p>
          <h2>Welcome back, {user?.name?.split(' ')[0] || 'Admin'}.</h2>
          <p>Here’s a clear snapshot of your library today.</p>
        </div>
        <span className="dashboard-date">{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </header>

      <div className="stats-grid admin-stats-grid">
        <StatCard icon="fa-book" value={stats.totalBooks} label="Total books" />
        <StatCard icon="fa-users" value={stats.totalUsers} label="Members" color="var(--info)" />
        <StatCard icon="fa-hand-holding-heart" value={stats.activeBorrows} label="Active borrows" color="var(--success)" />
        <StatCard icon="fa-exclamation-triangle" value={stats.lowStock} label="Low stock" color="var(--warning)" />
      </div>

      <section className="dashboard-panel chart-panel">
        <div className="panel-heading">
          <div><h3>Library activity</h3><p>Books, borrowing activity, and stock at a glance.</p></div>
          <span className="metric-pill">{stats.returned} returned</span>
        </div>
        <div className="chart-wrap"><Chart data={chartData} /></div>
      </section>

      <div className="dashboard-detail-grid">
        <section className="dashboard-panel">
          <div className="panel-heading"><div><h3>Recent borrowing</h3><p>Latest activity from members.</p></div></div>
          {recentBorrows.length ? <ul className="dashboard-list">
            {recentBorrows.map((borrow) => <li key={borrow._id}>
              <span className="list-marker">↗</span>
              <div><strong>{borrow.userName}</strong><p>Borrowed {borrow.bookTitle}</p></div>
              <span className={`status-badge ${borrow.status}`}>{borrow.status}</span>
            </li>)}
          </ul> : <p className="dashboard-empty">No borrowing activity yet.</p>}
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading"><div><h3>Top rated books</h3><p>Your highest-rated titles.</p></div></div>
          {topBooks.length ? <ul className="dashboard-list">
            {topBooks.map((book) => <li key={book._id}>
              <span className="list-marker star">★</span>
              <div><strong>{book.title}</strong><p>{book.author}</p></div>
              <span className="book-rating">{book.ratings}</span>
            </li>)}
          </ul> : <p className="dashboard-empty">No books added yet.</p>}
        </section>
      </div>
    </div>
  );
}
