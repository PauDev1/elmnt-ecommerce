const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};