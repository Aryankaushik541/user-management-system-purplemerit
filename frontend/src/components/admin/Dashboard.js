import React, { useEffect, useState } from 'react';
import { userAPI } from '../../services/api';
import Toast from '../common/Toast';
import Modal from '../common/Modal';
import './dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    action: null,
    userId: null,
    userName: '',
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userAPI.getAllUsers({
        page: pagination.page,
        search,
        ...filters,
      });
      setUsers(res.data.users);
      setPagination(res.data.pagination);
    } catch {
      setToast({ message: 'Failed to load users', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      if (confirmModal.action === 'activate')
        await userAPI.activateUser(confirmModal.userId);
      if (confirmModal.action === 'deactivate')
        await userAPI.deactivateUser(confirmModal.userId);

      setToast({ message: 'Action successful', type: 'success' });
      fetchUsers();
    } catch {
      setToast({ message: 'Action failed', type: 'error' });
    }
    setConfirmModal({ isOpen: false });
  };

  return (
    <div className="dashboard-wrapper">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="dashboard-header">
        <h1 className="dashboard-title">User Management</h1>
        <p className="dashboard-subtitle">
          Control users, roles & access in real time
        </p>
      </div>

      <div className="glass-card">
        <div className="dashboard-actions">
          <input
            className="search-input"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters">
            <select
              className="filter-select"
              onChange={(e) =>
                setFilters({ ...filters, role: e.target.value })
              }
            >
              <option value="">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <select
              className="filter-select"
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loader">Loading users…</div>
        ) : users.length === 0 ? (
          <div className="empty-state">No users found</div>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className="badge badge-role">{u.role}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          u.status === 'active'
                            ? 'badge-active'
                            : 'badge-inactive'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`action-btn ${
                          u.status === 'active' ? 'danger' : 'success'
                        }`}
                        onClick={() =>
                          setConfirmModal({
                            isOpen: true,
                            action:
                              u.status === 'active'
                                ? 'deactivate'
                                : 'activate',
                            userId: u._id,
                            userName: u.fullName,
                          })
                        }
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                disabled={pagination.page === 1}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page - 1 }))
                }
              >
                Prev
              </button>
              <span>
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                disabled={pagination.page === pagination.pages}
                onClick={() =>
                  setPagination((p) => ({ ...p, page: p.page + 1 }))
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={confirmModal.isOpen}
        title="Confirm Action"
        onClose={() => setConfirmModal({ isOpen: false })}
        footer={
          <>
            <button
              className="btn-secondary"
              onClick={() => setConfirmModal({ isOpen: false })}
            >
              Cancel
            </button>
            <button className="btn-danger" onClick={handleConfirm}>
              Confirm
            </button>
          </>
        }
      >
        Are you sure you want to {confirmModal.action}{' '}
        <strong>{confirmModal.userName}</strong>?
      </Modal>
    </div>
  );
};

export default Dashboard;
