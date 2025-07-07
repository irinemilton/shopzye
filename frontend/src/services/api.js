import axios from 'axios';

// ✅ Create Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// ✅ Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Auto-refresh token if expired (401) and retry the request
api.interceptors.response.use(
  (response) => response, // If no error, pass the response
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors that haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          localStorage.setItem('accessToken', newAccessToken);

          // Update the failed request with the new token and retry it
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('🔒 Refresh token failed:', refreshError);
        }
      }

      // Refresh failed or no token — clear session and redirect
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
