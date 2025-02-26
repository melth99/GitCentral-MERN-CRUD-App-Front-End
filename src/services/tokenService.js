// frontend/services/tokenService.js
export function getToken() {
  const token = localStorage.getItem('token');
  console.log('Retrieved token:', token); // Debug
  return token;
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    console.log('Token set:', token); // Debug
  }
}

export function removeToken() {
  localStorage.removeItem('token');
}