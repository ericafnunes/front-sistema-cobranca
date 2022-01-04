import { useState } from "react";

const useRegisterProvider = () => {
  const [nameRegister, setNameRegister] = useState();
  const [emailRegister, setEmailRegister] = useState();

  return {
    nameRegister,
    setNameRegister,
    emailRegister,
    setEmailRegister,
  };
};

export default useRegisterProvider;
