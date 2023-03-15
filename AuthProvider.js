import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check AsyncStorage for user data on app launch
    AsyncStorage.getItem('user')
      .then((userData) => {
        if (userData) {
          setUser(JSON.parse(userData));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Save user data to AsyncStorage
    AsyncStorage.setItem('user', JSON.stringify(userData))
      .catch((error) => console.error(error));
  };

  const logout = () => {
    setUser(null);
    // Remove user data from AsyncStorage
    AsyncStorage.removeItem('user')
      .catch((error) => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
