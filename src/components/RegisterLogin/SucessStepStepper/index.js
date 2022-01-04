import "./style.css";
import checked from "../../../assets/Icon-checked.svg";
import { NavLink } from "react-router-dom";

const FirstStepStepper = () => {
  return (
    <div className="vertical-container">
      <div className="steps">
        <NavLink to="/firstStep">
          <div className="step-cicle">
            <div className="step-cicle--first">
              <img src={checked} alt="checked" />
            </div>
          </div>
        </NavLink>
        <div className="step-direct"></div>
        <NavLink to="/passwordStep">
          <div className="step-cicle step-cicle-password">
            <div className="step-cicle--second">
              <img src={checked} alt="checked" />
            </div>
          </div>
        </NavLink>

        <div className="step-direct"></div>
        <div className="step-cicle step-cicle-sucess">
          <div className="step-cicle--third">
            <img src={checked} alt="checked" />
          </div>
        </div>
      </div>
      <div className="label-steps">
        <div className="label-step">
          <h3>Cadastre-se</h3>
          <p>Por favor, escreva seu nome e e-mail</p>
        </div>
        <div className="label-step">
          <h3>Escolha uma Senha</h3>
          <p>Escolha uma senha segura</p>
        </div>
        <div className="label-step">
          <h3>Cadastro realizado com sucesso</h3>
          <p>E-mail e senha cadastrados com sucesso</p>
        </div>
      </div>
    </div>
  );
};

export default FirstStepStepper;
