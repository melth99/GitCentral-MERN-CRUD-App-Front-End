// frontend/services/userService.js
import { getToken } from './tokenService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const index = async () => {
  try {
    const headers = getHeaders();
    console.log('Headers for /users:', headers); // Debug
    const res = await fetch(BASE_URL, {
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status} - ${data.error || 'Unknown error'}`);
    }
    return data;
  } catch (err) {
    console.error('User fetch error:', err);
    throw err;
  }
};