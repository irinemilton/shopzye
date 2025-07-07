import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ResetPassword = () => {
  const { uidb64, token } = useParams(); // ✅ Match URL param with backend
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    // 🔐 Frontend validation
    if (!newPassword || !confirmPassword) {
      alert('⚠️ Please fill in both fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('⚠️ Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      await api.post(`password-reset/${uidb64}/${token}/`, {
        password: newPassword,
      });

      alert('✅ Password has been reset successfully!');
      navigate('/login');
    } catch (error) {
      console.error('❌ Password reset failed:', error.response?.data || error.message);
      alert('⚠️ Failed to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center" style={{ padding: '40px 20px' }}>
      <h2 className="futuristic-heading">🔐 Reset Your Password</h2>

      <form
        onSubmit={handleReset}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}
      >
        <label className="futuristic-label">New Password</label>
        <input
          type="password"
          className="futuristic-input"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label className="futuristic-label" style={{ marginTop: '10px' }}>Confirm Password</label>
        <input
          type="password"
          className="futuristic-input"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="futuristic-btn"
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
