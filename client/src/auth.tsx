import { createContext, useContext } from "react";
import type { User } from "./types";

export type AuthValue = {
  user: User;
  setUser: (user: User | null) => void;
  refresh: () => Promise<void>;
};

export const AuthContext = createContext<AuthValue | null>(null);

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("Auth missing");
  return value;
}
