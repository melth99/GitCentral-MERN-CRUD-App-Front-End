// src/services/authService.js
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const payload = {
      username: formData.username,
      email: formData.email, // Added email to payload
      password: formData.password,
    };

    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || `Sign-up failed: ${res.status}`);
    }

    if (!data.token) {
      throw new Error('No token received from server');
    }

    localStorage.setItem('token', data.token);
    try {
      const decodedPayload = JSON.parse(atob(data.token.split('.')[1])).payload;
      console.log('Sign-up successful, decoded payload:', decodedPayload);
      return decodedPayload;
    } catch (decodeErr) {
      console.error('Error decoding token:', decodeErr);
      throw new Error('Invalid token format');
    }
  } catch (err) {
    console.error('Sign-up error:', err.message);
    throw err;
  }
};

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || `Sign-up failed: ${res.status}`);
    }

    if (!data.token) {
      throw new Error('No token received from server');
    }
console.log(data)
    localStorage.setItem('token', data.token);
    try {
      const decodedPayload = JSON.parse(atob(data.token.split('.')[1])).payload;
      console.log('Sign-in successful, decoded payload:', decodedPayload);
      return decodedPayload;
    } catch (decodeErr) {
      console.error('Error decoding token:', decodeErr);
      throw new Error('Invalid token format');
    }
  } catch (err) {
    console.error('Sign-in error:', err.message);
    throw err;
  }
};

export { signUp, signIn };