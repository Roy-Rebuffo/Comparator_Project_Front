export interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    confirmed: boolean;
    isAdmin: boolean;
    password: string,
    token: string,
    __v: number;
  }