// src/services/tokenService.js
export function getToken() {
  return localStorage.getItem('token'); // Matches UserContext.jsx logic
}