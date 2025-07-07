import React, { useState } from 'react';
import api from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('password-reset/', { email });
      setMessage('✅ Password reset link sent to your email.');
    } catch (err) {
      setError('⚠️ Unable to send reset link. Please check the email.');
    }
  };

  return (
    <div className="container text-center">
      <h2 className="futuristic-heading">Forgot Password</h2>

      <form onSubmit={handleSend} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="email"
          className="futuristic-input"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="futuristic-btn">Send Reset Link</button>
      </form>

      {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
