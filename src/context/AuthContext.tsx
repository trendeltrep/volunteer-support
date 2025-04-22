import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserAccount, Volunteer, Recipient, Fund, Requirement } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: UserAccount | null;
  setUser: (user: UserAccount | null) => void;
  volunteer: Volunteer | null;
  setVolunteer: (volunteer: Volunteer | null) => void;
  recipient: Recipient | null;
  setRecipient: (recipient: Recipient | null) => void;
  funds: Fund[];
  requirements: Requirement[];
  setFunds: (funds: Fund[]) => void;
  addFund: (fund: Fund) => void;
  setRequirements: (requirements: Requirement[]) => void;
  addRequirement: (requirement: Requirement) => void;
  login: (email: string, password: string, role: "Volunteer" | "Recipient") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  funds: "app_funds",
  requirements: "app_requirements",
};

// Моки
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


const mockFunds: Fund[] = [
  {
    id: "1",
    name: "Помощь детям",
    image: "/images/fund1.jpg",
    progress: 60,
    isHot: true,
    volunteer: "Иван",
    recipient: "Орфан",
  },
  {
    id: "2",
    name: "Медикаменты",
    image: "/images/fund2.jpg",
    progress: 30,
    isHot: false,
    volunteer: "Анна",
    recipient: "Больница",
  },
];

const mockRequirements: Requirement[] = [
  {
    id: "req-1", 
    title: "Продукты для семьи",
    createdBy: mockRecipient,
    items: [
      { name: "Молоко", quantity: 2, category: "Food" },
      { name: "Хлеб", quantity: 3, category: "Medicine" },
      { name: "Макароны", quantity: 1, category: "Food" },
    ],
  },
  {
    id: "req-2", 
    title: "Одежда для детей",
    createdBy: mockRecipient,
    items: [
      { name: "Куртка зимняя", quantity: 2, category: "Other" },
      { name: "Шапка", quantity: 4, category: "Food" },
    ],
  },
];



const getFromLocalStorage = <T,>(key: string, fallback: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const [funds, setFundsState] = useState<Fund[]>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.funds, mockFunds)
  );
  const [requirements, setRequirementsState] = useState<Requirement[]>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.requirements, mockRequirements)
  );

  const navigate = useNavigate();

  const setFunds = (newFunds: Fund[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.funds, JSON.stringify(newFunds));
    setFundsState(newFunds);
  };

  const addFund = (fund: Fund) => {
    const updated = [...funds, fund];
    setFunds(updated);
  };

  const setRequirements = (newRequirements: Requirement[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.requirements, JSON.stringify(newRequirements));
    setRequirementsState(newRequirements);
  };

  const addRequirement = (requirement: Requirement) => {
    const updated = [...requirements, requirement];
    setRequirements(updated);
  };

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
    <AuthContext.Provider
      value={{
        user,
        setUser,
        volunteer,
        setVolunteer,
        recipient,
        setRecipient,
        funds,
        requirements,
        setFunds,
        addFund,
        setRequirements,
        addRequirement,
        login,
        logout,
      }}
    >
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
