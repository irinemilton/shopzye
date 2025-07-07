import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../services/userService';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    console.log("🔄 Fetching profile...");

    getUserProfile()
      .then(res => {
        setUser(res.data);
        console.log("✅ Profile loaded:", res.data);
      })
      .catch(err => {
        console.error("❌ Failed to load profile:", err.response?.data || err.message);
        setStatus('❌ Failed to load profile.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setStatus('❌ Not authenticated');
      return;
    }

    console.log("📡 Updating profile...");

    updateUserProfile(user)
      .then(() => setStatus('✅ Profile updated successfully!'))
      .catch((err) => {
        console.error("❌ Error updating profile:", err.response?.data || err.message);
        setStatus('❌ Error updating profile.');
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading profile...</p>;
  }

  return (
    <div className="container text-center" style={{ padding: '60px 20px', maxWidth: '500px', margin: 'auto' }}>
      <h2 className="futuristic-heading mb-4">👤 My Profile</h2>

      {status && (
        <p style={{
          color: status.startsWith('✅') ? 'green' : 'red',
          marginBottom: '10px'
        }}>
          {status}
        </p>
      )}

      <div className="futuristic-card" style={{ padding: '20px' }}>
        <input
          type="text"
          name="name"
          value={user.name || ''}
          onChange={handleChange}
          className="futuristic-input"
          placeholder="Name"
          style={{ marginBottom: '10px' }}
        />
        <input
          type="email"
          name="email"
          value={user.email || ''}
          onChange={handleChange}
          className="futuristic-input"
          placeholder="Email"
          disabled
        />

        <button
          onClick={handleUpdate}
          className="futuristic-btn"
          style={{ marginTop: '20px' }}
        >
          🔄 Update Profile
        </button>

        <button
          onClick={handleLogout}
          className="futuristic-btn"
          style={{ marginTop: '10px', backgroundColor: '#ff4d4d' }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;