export interface Fund {
  id: string;
  name: string;
  description: string;
  image: string;
  progress: number;
  volunteer: string;
  recipient: string;
  requirementId: string;
  link: string;
  status: "active" | "disabled";
  reportUrl?: string;
  items: { name: string; quantity: number }[];
  rating?: number;
}





export interface RequirementItem {
  name: string;
  quantity: number;
  category: "Food" | "Medicine" | "Equipment" | "Other";
}

export interface Requirement {
  id: string;
  title: string;
  description?: string; 
  createdBy: Recipient;
  items: {
    name: string;
    quantity: number;
    category: string;
  }[];
  funds?: Fund[];
  deadline?: string;
  priority?: "High" | "None";
}


export interface SearchParams {
  query: string;
}

export interface UserAccount {
  id: string;
  email: string;
  role: "Volunteer" | "Recipient";
  profilePic?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  surname: string;
  phone: string;
  age: number;
  rating: number;
  totalReports: number;
  userAccount: UserAccount;
}

export interface Recipient {
  id: string;
  name: string;
  surname: string;
  phone: string;
  needs: string;
  userAccount: UserAccount;
}
