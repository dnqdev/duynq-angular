export interface Role {
  id: string;
  name: string;
  code: string;
  layout?: string;
  userNumber?: number;
  users?: any;
  description?: string;
}

export interface UserRole {
  id: string;
  username: string;
  fullName?: string;
  code: string;
  account: string;
  email?: string;
  phone?: string;
  isActive?: number;
}
