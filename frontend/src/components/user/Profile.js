import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Toast from '../common/Toast';
import Modal from '../common/Modal';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editData, setEditData] = useState({ fullName: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setEditData({ fullName: user.fullName, email: user.email });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userAPI.updateProfile(editData);
      updateUser(response.data.user);
      setToast({ message: 'Profile updated successfully', type: 'success' });
      setIsEditModalOpen(false);
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to update profile', type: 'error' });
    }
    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    setLoading(true);
    try {
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setToast({ message: 'Password changed successfully', type: 'success' });
      setIsPasswordModalOpen(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setToast({ message: error.response?.data?.message || 'Failed to change password', type: 'error' });
    }
    setLoading(false);
  };

  if (!user) return <div className="spinner"></div>;

  return (
    <div className="profile-container">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="profile-header">
        <div className="profile-avatar">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-sections">
        <div className="card">
          <div className="card-header">
            <h3 className="section-title">Personal Information</h3>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Full Name</div>
              <div className="info-value">{user.fullName}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Role</div>
              <div className="info-value">
                <span className={`badge badge-${user.role === 'admin' ? 'primary' : 'secondary'}`}>
                  {user.role}
                </span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Status</div>
              <div className="info-value">
                <span className={`badge badge-${user.status === 'active' ? 'success' : 'danger'}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <div className="action-buttons" style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={() => setIsEditModalOpen(true)}>
              Edit Profile
            </button>
            <button className="btn btn-secondary" onClick={() => setIsPasswordModalOpen(true)}>
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpdateProfile} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={editData.fullName}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleChangePassword} disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </>
        }
      >
        <form onSubmit={handleChangePassword}>
          <div className="form-group">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-input"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-input"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;