import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await jobService.getProfile();
      const p = res.data.profile;
      setFormData({
        name: p.name || '', email: p.email || '',
        phone: p.phone || '', location: p.location || '', bio: p.bio || ''
      });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await jobService.updateProfile(formData);
      setMessage('✅ Profile updated successfully!');
      setIsError(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to update profile. Please try again.');
      setIsError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <div className="page-header">
            <div>
              <h1>Profile</h1>
              <p>Manage your personal information</p>
            </div>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="profile-section">
              {/* Profile Form */}
              <div className="profile-card">
                <h2>Personal Information</h2>

                {message && (
                  <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text" value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email" value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text" value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text" value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? '💾 Saving...' : '💾 Save Changes'}
                  </button>
                </form>
              </div>

              {/* Account Info */}
              <div className="profile-card">
                <h2>Account Info</h2>
                <div className="account-info">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-value">{formData.name || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{formData.email || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location</span>
                    <span className="info-value">{formData.location || 'Not set'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{formData.phone || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;