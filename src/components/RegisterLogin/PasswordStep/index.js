import PasswordStepStepper from "../PasswordStepStepper";
import "./style.css";
import "../../../App.css";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import openEye from "../../../assets/openEye.svg";
import hideEye from "../../../assets/hideEye.svg";
import useRegisterContext from "../../../Hooks/useRegisterContext";

const PasswordStep = () => {
  const history = useHistory();
  const [inputPassword, setInputPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [visibilityConfirmPass, setVisibilityConfirmPass] = useState(false);

  const { nameRegister, emailRegister } = useRegisterContext();

  const handleVisibility = () => {
    setVisibility((prevState) => !prevState);
  };

  const handleConfirmPass = () => {
    setVisibilityConfirmPass((prevState) => !prevState);
  };
  

  const handleRequestRegister = async (event) => {
    event.preventDefault();

    if (inputPassword !== confirmPassword) {
      event.preventDefault();
      toast.error("As senhas não coincidem. Tente novamente");
      return;
    }

    if (inputPassword !== confirmPassword) {
      event.preventDefault();
      toast.error("Senhas não coincidem. Tente Novamente");
      return;
    }

    try {
      const data = {
        nome_usuario: nameRegister,
        email_usuario: emailRegister,
        senha: confirmPassword,
      };

      const response = await fetch(
        `https://client-api-management.herokuapp.com/usuario`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        event.preventDefault();
        toast.error(responseData.mensagem);
        return;
      }

      localStorage.removeItem("email");
      localStorage.removeItem("name");

      history.push("/sucessStep");
    } catch (error) {
      console.log("erro", error);
    }
  };

  return (
    <main className="container">
      <div className="left">
        <PasswordStepStepper />
      </div>
      <div className="right">
        <h1>Escolha uma senha</h1>

        <form className="add-data__form">
          <div className="input-label">
            <label>Senha*</label>
            <div className="input">
              <input
                className="input-pass"
                onChange={(event) => setInputPassword(event.target.value)}
                required
                type={visibility ? "text" : "password"}
                placeholder="Digite sua senha"
              />
              <div className="inputIcon--first">
                <img
                  onClick={handleVisibility}
                  src={visibility ? openEye : hideEye}
                  alt="visibilityEye"
                />
              </div>
            </div>
          </div>
          <div className="input-label">
            <label>Repita a senha*</label>

            <div className="input">
              <input
                className="input-pass"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type={visibilityConfirmPass ? "text" : "password"}
                placeholder="Repita sua senha"
              />
              <div className="inputIcon--second">
                <img
                  onClick={handleConfirmPass}
                  src={visibilityConfirmPass ? openEye : hideEye}
                  alt="visibilityEye"
                />
              </div>
            </div>
          </div>
          <ToastContainer />
          <div className="btn-home">
            <button onClick={handleRequestRegister}>Continuar</button>
          </div>
          <div className="home-login">
            <span>
              Já possui uma conta? Faça seu <NavLink to="/login">Login</NavLink>
            </span>
          </div>
        </form>

        <div className="right-steps">
          <div className="right-steps__password--first"></div>
          <div className="right-steps__password--second"></div>
          <div className="right-steps__password--third"></div>
        </div>
      </div>
    </main>
  );
};

export default PasswordStep;