import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import Toast from '../common/Toast';
import Modal from '../common/Modal';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, action: null, userId: null, userName: '' });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search,
        ...filters
      };
      const response = await userAPI.getAllUsers(params);
      setUsers(response.data.users);
      setPagination(prev => ({ ...prev, ...response.data.pagination }));
    } catch (error) {
      setToast({ message: 'Failed to fetch users', type: 'error' });
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers();
  };

  const handleAction = async (action, userId, userName) => {
    setConfirmModal({ isOpen: true, action, userId, userName });
  };

  const confirmAction = async () => {
    const { action, userId } = confirmModal;
    try {
      if (action === 'activate') {
        await userAPI.activateUser(userId);
        setToast({ message: 'User activated successfully', type: 'success' });
      } else if (action === 'deactivate') {
        await userAPI.deactivateUser(userId);
        setToast({ message: 'User deactivated successfully', type: 'success' });
      } else if (action === 'delete') {
        await userAPI.deleteUser(userId);
        setToast({ message: 'User deleted successfully', type: 'success' });
      }
      fetchUsers();
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Action failed', type: 'error' });
    }
    setConfirmModal({ isOpen: false, action: null, userId: null, userName: '' });
  };

  return (
    <div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="dashboard-header">
        <h1 className="dashboard-title">User Management</h1>
      </div>

      <div className="card">
        <div className="dashboard-actions">
          <form onSubmit={handleSearch} className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="filters">
            <select
              className="filter-select"
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3 className="empty-state-title">No users found</h3>
            <p className="empty-state-text">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge badge-${user.role === 'admin' ? 'primary' : 'secondary'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${user.status === 'active' ? 'success' : 'danger'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {user.status === 'active' ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleAction('deactivate', user._id, user.fullName)}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleAction('activate', user._id, user.fullName)}
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
              >
                Previous
              </button>
              <span>
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, action: null, userId: null, userName: '' })}
        title="Confirm Action"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setConfirmModal({ isOpen: false, action: null, userId: null, userName: '' })}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmAction}>
              Confirm
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to {confirmModal.action} user <strong>{confirmModal.userName}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default Dashboard;