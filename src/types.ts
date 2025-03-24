export interface Fund {
  id: string;
  name: string;
  image: string;
  progress: number;
  isHot: boolean;
  volunteer: string;
  recipient: string;
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

  