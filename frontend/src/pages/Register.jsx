import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword)
      return setError('Passwords do not match');
    if (formData.password.length < 6)
      return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>✈️ JobPilot</h1>
          <h2>Create Account</h2>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Enter your full name" required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Enter your email" required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" name="password" value={formData.password}
                onChange={handleChange} placeholder="Min. 6 characters" required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password" name="confirmPassword" value={formData.confirmPassword}
                onChange={handleChange} placeholder="Confirm password" required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating account...' : '🚀 Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;