import { useContext } from "react";
import { AuthContext } from "../context/loginStep";

const useAuthLogin = () => {
  return useContext(AuthContext);
};

export default useAuthLogin;
