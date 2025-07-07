import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import googlePlayBadge from '../../assets/google-play-badge.png';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('🔐 Login: Attempting login with:', credentials.email);
      const res = await loginUser(credentials);

      console.log('🔐 Login: Login response received:', res.data);
      console.log('🔐 Login: Access token:', res.data.access ? 'Present' : 'Missing');
      console.log('🔐 Login: Refresh token:', res.data.refresh ? 'Present' : 'Missing');

      // Use AuthContext login function - this will automatically trigger cart loading
      login({ access: res.data.access, refresh: res.data.refresh });
      
      console.log('🔐 Login: Tokens stored in localStorage');
      console.log('🔐 Login: Access token in localStorage:', !!localStorage.getItem('accessToken'));

      alert('✅ Login successful!');
      navigate('/');
    } catch (err) {
      console.error('🔐 Login error:', err);

      if (err.response?.status === 401) {
        setError('❌ Invalid credentials. Please try again.');
      } else {
        setError('❌ An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="auth-container text-center" style={{ padding: '60px 20px' }}>
      <h1 className="futuristic-heading" style={{ fontSize: '2.2rem', marginBottom: '20px' }}>
        Welcome to <span style={{ color: '#00ffc3' }}>Shopzye</span>
      </h1>

      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
        Sign in to continue exploring amazing deals!
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}

        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="futuristic-input"
          placeholder="Email"
          required
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="futuristic-input"
          placeholder="Password"
          required
          autoComplete="current-password"
        />
        <button type="submit" className="futuristic-btn" style={{ marginTop: '10px' }}>
          🔓 Login
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <Link to="/forgot-password" className="link-text">Forgot Password?</Link><br />
        <span style={{ color: 'var(--text-muted)' }}>Don't have an account?</span>{' '}
        <Link to="/register" className="link-text">Register</Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Get our app</p>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Shopzye on Google Play"
        >
          <img
            src={googlePlayBadge}
            alt="Get it on Google Play"
            width="180"
            style={{ marginTop: '10px' }}
          />
        </a>
      </div>
    </div>
  );
};

export default Login;
