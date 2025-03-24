import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserAccount, Volunteer, Recipient } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: UserAccount | null;
  volunteer?: Volunteer | null;
  recipient?: Recipient | null;
  login: (email: string, password: string, role: "Volunteer" | "Recipient") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockVolunteer: Volunteer = {
  id: "vol-456",
  name: "Иван",
  surname: "Петров",
  phone: "+380501234567",
  age: 28,
  rating: 4.7,
  totalReports: 15,
  userAccount: {
    id: "user-123",
    email: "volunteer@example.com",
    role: "Volunteer",
  },
};

const mockRecipient: Recipient = {
  id: "rec-789",
  name: "Анна",
  surname: "Сидорова",
  phone: "+380501234567",
  needs: "Помощь в покупке продуктов",
  userAccount: {
    id: "user-789",
    email: "recipient@example.com",
    role: "Recipient",
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string, role: "Volunteer" | "Recipient") => {
    console.log("Mock login:", email, "as", role);
    if (role === "Volunteer") {
      setUser(mockVolunteer.userAccount);
      setVolunteer(mockVolunteer);
      setRecipient(null);
      navigate("/volunteer");
    } else {
      setUser(mockRecipient.userAccount);
      setRecipient(mockRecipient);
      setVolunteer(null);
      navigate("/recipient");
    }
    
  };

  const logout = () => {
    setUser(null);
    setVolunteer(null);
    setRecipient(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, volunteer, recipient, login, logout }}>
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
