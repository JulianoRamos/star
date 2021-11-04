import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';

import api from '../services/api';

interface IAuthState {
  token: string;
  user: IUserData;
}

interface IUserData {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUserData;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC<IAuthProvider> = ({ children }: IAuthProvider) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@star:token');
    const user = localStorage.getItem('@star:user');

    if (token && user) {
      api.defaults.headers.common.authorization = token;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@star:token', token);
    localStorage.setItem('@star:user', JSON.stringify(user));

    api.defaults.headers.common.authorization = token;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@star:token');
    localStorage.removeItem('@star:user');

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
