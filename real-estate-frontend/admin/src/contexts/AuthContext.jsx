import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(localStorage.getItem('admin')),
  );
  const updateAdmin = (data) => {
    setCurrentAdmin(data);
    localStorage.setItem('admin', JSON.stringify(data));
  };
  return (
    <AuthContext.Provider value={{ currentAdmin, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
