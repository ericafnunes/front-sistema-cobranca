import { useContext } from "react";

import RegisterContext from "../context/registerSteps";

const useRegisterContext = () => {
  return useContext(RegisterContext);
};

export default useRegisterContext;
