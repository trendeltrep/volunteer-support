import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserAccount, Volunteer } from "../types";

interface AuthContextType {
  user: UserAccount | null;
  volunteer?: Volunteer | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUserAccount: UserAccount = {
    id: "user-123",
    email: "volunteer@example.com",
    role: "Volunteer",
  };
  
const mockVolunteer: Volunteer = {
    id: "vol-456",
    name: "Иван",
    surname: "Петров",
    phone: "+380501234567",
    age: 28,
    rating: 4.7,
    totalReports: 15,
  };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(mockUserAccount);
  const [volunteer, setVolunteer] = useState<Volunteer | null>(
    mockUserAccount.role === "Volunteer" ? mockVolunteer : null
  );

  const login = (email: string, password: string) => {
    console.log("Mock login:", email);
    setUser(mockUserAccount);
    setVolunteer(mockUserAccount.role === "Volunteer" ? mockVolunteer : null);
  };

  const logout = () => {
    setUser(null);
    setVolunteer(null);
  };

  return (
    <AuthContext.Provider value={{ user, volunteer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
