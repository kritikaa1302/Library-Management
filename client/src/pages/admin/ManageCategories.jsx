import { useState, useEffect } from 'react';
import { getCategories, createCategory, deleteCategory } from '../../api/categoryApi';
import { showToast } from '../../components/Toast';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data);
    } catch (err) {
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const name = prompt('Enter new category name:');
    if (name) {
      try {
        await createCategory(name);
        await fetchCategories();
        showToast('Category added', 'success');
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed', 'error');
      }
    }
  };

  const handleDelete = async (name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      try {
        await deleteCategory(name);
        await fetchCategories();
        showToast('Category deleted', 'success');
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed', 'error');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn-primary" onClick={handleAdd}><i className="fas fa-plus"></i> Add Category</button>
      </div>
      <div className="stats-grid">
        {categories.map(cat => (
          <div key={cat._id} className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span><i className="fas fa-tag" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>{cat.name}</span>
            <button className="btn-danger" onClick={() => handleDelete(cat.name)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}