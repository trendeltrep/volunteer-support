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
  volunteer: "app_volunteer",
  recipient: "app_recipient",
};


const mockVolunteer: Volunteer = {
  id: "vol-456",
  name: "Микола",
  surname: "Миколайович",
  phone: "+380501234567",
  age: 28,
  rating: 4.7,
  totalReports: 2,
  userAccount: {
    id: "user-123",
    email: "volunteer@example.com",
    role: "Volunteer",
  },
};

const mockRecipient: Recipient = {
  id: "rec-789",
  name: "Бригада",
  surname: "№256",
  phone: "+380501234567",
  needs: "Допмога для сім'ї",
  userAccount: {
    id: "user-789",
    email: "recipient@example.com",
    role: "Recipient",
  },
};


const mockFunds: Fund[] = [
{
    id: "1748636166716",
    name: "123",
    description: "123",
    link: "https://send.monobank.ua/jar/AXa4r1ZWdv",
    recipient: "recipient@example.com",
    volunteer: "volunteer@example.com",
    items: [
        {
            "name": "1",
            "quantity": 1
        },
        {
            "name": "3",
            "quantity": 3
        },
        {
            "name": "4",
            "quantity": 4
        }
    ],
    status: "disabled",
    image: "/images/1.jpg",
    progress: 0,
    requirementId: "1748636134737",
    reportUrl: "blob:http://localhost:3000/f00a2ffc-d1b8-43ad-8d27-e78ed73a570e"
  },
  {
    id: "1748636222686",
    name: "333333333",
    description: "33333333333333",
    link: "https://send.monobank.ua/jar/AXa4r1ZWdv",
    recipient: "recipient@example.com",
    volunteer: "volunteer@example.com",
    items: [
        {
            "name": "Молоко",
            "quantity": 2
        }
    ],
    status: "disabled",
    image: "/images/2.jpg",
    progress: 0,
    requirementId: "req-1",
    reportUrl: "blob:http://localhost:3000/b613a630-304c-45ea-821b-eb48dea65d52",
    rating: 4
    }
  ];

const mockRequirements: Requirement[] = [
  {
    id: "req-1", 
    title: "Продукти для сім’ї",
    createdBy: mockRecipient,
    items: [
      { name: "Молоко", quantity: 2, category: "Food" },
      { name: "Хліб", quantity: 3, category: "Food" },
    ],
    deadline: "2025-06-10T00:00:00.000Z",
    priority: "High",
  },
  {
    id: "req-2", 
    title: "Одяг для дітей",
    createdBy: mockRecipient,
    items: [
      { name: "Куртка", quantity: 2, category: "Equipment" },
      { name: "Шапка", quantity: 1, category: "Other" },
    ],
    deadline: "2025-06-20T00:00:00.000Z",
    priority: "None",
  },
];


const getFromLocalStorage = <T,>(key: string, fallback: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [volunteer, setVolunteerState] = useState<Volunteer | null>(() =>
  getFromLocalStorage(LOCAL_STORAGE_KEYS.volunteer, mockVolunteer)
);

  const [recipient, setRecipientState] = useState<Recipient | null>(() =>
    getFromLocalStorage(LOCAL_STORAGE_KEYS.recipient, mockRecipient)
  );

  const setVolunteer = (volunteer: Volunteer | null) => {
    if (volunteer) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.volunteer, JSON.stringify(volunteer));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.volunteer);
    }
    setVolunteerState(volunteer);
  };

  const setRecipient = (recipient: Recipient | null) => {
    if (recipient) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.recipient, JSON.stringify(recipient));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.recipient);
    }
    setRecipientState(recipient);
  };


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
