export interface Customer{
    address: string;
    phone: string;
    [key: string]: any;
}

export interface User{
    id: number;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    image: string;
    customer?: Customer;
    [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User, token?: string) => void;
  logout: () => void;
}