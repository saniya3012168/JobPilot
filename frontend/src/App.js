import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Resume from './pages/Resume';
import Interview from './pages/Interview';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>⚠️ Something went wrong</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Not Found Page
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '2rem'
  }}>
    <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
      The page you're looking for doesn't exist.
    </p>
    <a 
      href="/" 
      style={{
        padding: '1rem 2rem',
        background: 'white',
        color: '#4f46e5',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600'
      }}
    >
      Go Home
    </a>
  </div>
);

// Main App Component
function App() {
  // Set page title based on route
  React.useEffect(() => {
    const setTitle = () => {
      const path = window.location.pathname;
      const titles = {
        '/': 'JobPilot - Job Application Tracker',
        '/login': 'Login - JobPilot',
        '/register': 'Register - JobPilot',
        '/dashboard': 'Dashboard - JobPilot',
        '/jobs': 'Jobs - JobPilot',
        '/resume': 'Resume - JobPilot',
        '/interviews': 'Interviews - JobPilot',
        '/analytics': 'Analytics - JobPilot',
        '/profile': 'Profile - JobPilot'
      };
      document.title = titles[path] || 'JobPilot';
    };

    setTitle();
    window.addEventListener('popstate', setTitle);
    return () => window.removeEventListener('popstate', setTitle);
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/resume" 
              element={
                <ProtectedRoute>
                  <Resume />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/interviews" 
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;