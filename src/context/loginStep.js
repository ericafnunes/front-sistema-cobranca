import { createContext } from "react";
import useAuthProvider from "../Hooks/useAuthProvider";

export const AuthContext = createContext({});

export default function AuthProvider(props) {
  const loginProvider = useAuthProvider();

  return (
    <AuthContext.Provider value={loginProvider}>
      {props.children}
    </AuthContext.Provider>
  );
}
