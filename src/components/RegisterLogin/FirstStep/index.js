import FirstStepStepper from "../FirstStepStepper";
import { NavLink, useHistory } from "react-router-dom";
import "./style.css";
import "../../../App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterContext from "../../../Hooks/useRegisterContext";
import { useEffect } from "react";

const FirstStep = () => {
  const history = useHistory();
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const { setNameRegister, setEmailRegister } = useRegisterContext();

  const handleValidate = async () => {
    if (!inputName) {
      toast.error("É necessário preencher o campo Nome");
      return;
    }

    if (!inputEmail) {
      toast.error("É necessário preencher o campo Email");
      return;
    }

    let emailtest = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (!emailtest.test(inputEmail)) {
      toast.error("É necessário preencher um Email válido");
      return;
    }

    setNameRegister(inputName);
    setEmailRegister(inputEmail);

    history.push("/passwordStep");

    if (inputName && inputEmail) {
      localStorage.setItem("name", inputName);
      localStorage.setItem("email", inputEmail);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("name") && localStorage.getItem("email")) {
      setInputName(localStorage.getItem("name"));
      setInputEmail(localStorage.getItem("email"));
    }
  }, []);

  return (
    <main className="container">
      <div className="left">
        <FirstStepStepper />
      </div>
      <div className="right">
        <h1>Adicione seus dados</h1>
        <ToastContainer />
        <div className="add-data__form">
          <div className="input-label">
            <label htmlFor="Name">Nome*</label>
            <input
              className="input-principal"
              onChange={(event) => setInputName(event.target.value)}
              value={inputName}
              required
              type="text"
              placeholder="Digite seu nome"
              id="Name"
            />
          </div>
          <div className="input-label">
            <label htmlFor="Email">E-mail*</label>
            <input
              className="input-principal"
              onChange={(event) => setInputEmail(event.target.value)}
              value={inputEmail}
              required
              type="email"
              placeholder="Digite seu email"
              id="Email"
            />
          </div>
          <div className="btn-home">
            <button onClick={handleValidate}> Continuar</button>
          </div>
          <div className="home-login">
            <span>
              Já possui uma conta? Faça seu <NavLink to="/">Login</NavLink>
            </span>
          </div>
        </div>

        <div className="right-steps">
          <div className="right-steps__firstStep--first"></div>
          <div className="right-steps__firstStep--second"></div>
          <div className="right-steps__firstStep--third"></div>
        </div>
      </div>
    </main>
  );
};

export default FirstStep;
