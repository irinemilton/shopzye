import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('users/register/', form);
      alert('✅ Registered successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.username) {
        setError('⚠️ Username already taken.');
      } else if (err.response?.data?.email) {
        setError('⚠️ Email already registered.');
      } else if (err.response?.data?.password) {
        setError('⚠️ Password is too weak.');
      } else {
        setError('⚠️ Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center" style={{ padding: '50px 20px' }}>
      <h2 className="futuristic-heading" style={{ marginBottom: '30px' }}>
        Create Your Account
      </h2>

      {error && (
        <p className="error-text" style={{ color: 'red', marginBottom: '20px' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="futuristic-input"
          autoComplete="username"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="futuristic-input"
          autoComplete="email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="futuristic-input"
          autoComplete="new-password"
          required
        />
        <button
          type="submit"
          className="futuristic-btn"
          disabled={loading}
          aria-busy={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        Already have an account?{' '}
        <a href="/login" style={{ textDecoration: 'underline', color: '#00ffc3' }}>
          Login
        </a>
      </p>

      <p style={{ marginTop: '40px', fontSize: '0.8rem', color: '#888' }}>
        🚀 Coming soon on <strong>Google Play</strong> & <strong>App Store</strong>
      </p>
    </div>
  );
};

export default Register;
