import { createContext, useState } from "react";
import { User } from "../types/User";
import axios from "axios";
import { databaseURL } from "../constants";

interface AuthContextType {
  user: User | undefined;
  signup: (data: User) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const [user, setUser] = useState<User | undefined>();

  const signup = async (data: User) => {
    await axios.post(`${databaseURL}/users`, data);
  };

  const login = async (username: string, password: string) => {
    const req = await axios.get<[User]>(
      `${databaseURL}/users?id=${username}&password=${password}`,
    );
    const data = req.data[0];
    if (!data) {
      throw Error("Invalid data");
    }
    setUser(data);
  };

  const logout = () => {
    setUser(undefined);
  };

  return {
    login,
    logout,
    signup,
    user,
  };
};
