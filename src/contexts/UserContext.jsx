import { createContext, useState } from 'react';

const UserContext = createContext();

function getUserFromToken() {
  const token = localStorage.getItem('token');
  if (!token || token.split('.').length !== 3) return null;
  try {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload).payload;
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
}

function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };