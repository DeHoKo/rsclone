import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  token: null,
  login: (uid: string, token: string, expirationDate?: number, userEmail?: string) => {},
  logout: () => {}
});
