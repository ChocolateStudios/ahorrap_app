import React, { createContext, useState, useEffect, useContext } from 'react';

interface User {
  email: string;
  // Puedes agregar más campos como ID, nombre, rol, etc.
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simulación de login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Llamamos a una API ficticia o servicio simulado
    // para autenticar al usuario
    // (ver services/api.ts)
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (email === 'demo@ahorra.pe' && password === 'password') {
      setUser({ email });
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);
