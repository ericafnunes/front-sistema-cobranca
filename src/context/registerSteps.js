import { createContext } from "react";
import useRegisterProvider from "../Hooks/useRegisterProvider";

const RegisterContext = createContext({});

export const RegisterProvider = (props) => {
  const RegisterProvider = useRegisterProvider();

  return (
    <RegisterContext.Provider value={RegisterProvider}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterContext;
