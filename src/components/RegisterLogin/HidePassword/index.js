import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import "../../../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HidePassword = ({ inputPassword, confirmPassword }) => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    if (!event.target.value) {
      inputPassword(false);
      confirmPassword(false);
    }

    if (event.target.value) {
      inputPassword(true);
      confirmPassword(true);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Input
        required
        type={values.showPassword ? "text" : "password"}
        onChange={handlePasswordChange("password")}
        value={values.password}
        disableUnderline
        endAdornment={
          <IconButton onClick={handleClickShowPassword}>
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        }
      />
    </div>
  );
};

export default HidePassword;
