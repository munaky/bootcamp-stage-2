import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/auth';
import userAPI from '../api/user';
import authAPI from '../api/auth';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
const {addToast} = useToast();

useEffect(() => {
  if(token && !user){
    authAPI.get('/get')
    .then(async (r) => {
        const res = await r.data;
        const data = res.data;

        setUser(data);
    })
    .catch((e) => {
      console.log(e)
      logout();
      setToken(null);
      addToast({type: 'error', title: 'Unauthorized!', description:'Failed to retrieve user data.'});
    });
  }
}, [token, user])

  const login = (usr: User, t?: string) => {
    setUser(usr);
    localStorage.setItem('token', t || (token || ''));
    setToken(token)
  }

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext value={{ user, login, logout}}>
      {children}
    </AuthContext>
  );
};