<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { jobService } from '../services/jobService';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  const fetchProfile = async () => {
    try {
      const response = await jobService.getProfile();
      const profile = response.data.profile;
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      await jobService.updateProfile(formData);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="app-layout">
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <main className="content">
            <div className="loading">Loading profile...</div>
          </main>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <main className="content">
          <div className="page-header">
            <h1>Profile Settings</h1>
            <p>Manage your account information</p>
          </div>
          
          {message && (
            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
          
          <div className="profile-section">
            <div className="profile-card">
              <h2>Personal Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                  />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
            
            <div className="profile-card">
              <h2>Account Details</h2>
              <div className="account-info">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user?.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since:</span>
                  <span className="info-value">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
=======
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved (connect backend later)");
  };

  return (
    <div>
      <Navbar />
      <h2>Profile</h2>

      <input
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="Short bio"
        value={profile.bio}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}
>>>>>>> main
