import SucessStepStepper from "../SucessStepStepper";
import "./style.css";
import "../../../App.css";
import sucessChecked from "../../../assets/sucess-checked.svg";
import iconSucess from "../../../assets/Icon-sucess.svg";
import { NavLink } from "react-router-dom";


const SucessStep = () => {

  
  return (
    <main className="container">
      <div className="left">
        <SucessStepStepper />
      </div>
      <div className="right">
        <div className="pop-sucess">
          <div className="pop-sucess--content">
            <img src={sucessChecked} alt="sucessChecked" />
            <img className="pop-sucess--icon" src={iconSucess} alt="iconSucess" />
          </div>
          <h3>Cadastro realizado com sucesso!</h3>
        </div>
        <div className="btn-home sucess-btn">
          <NavLink to="/login"> <button>Ir para Login</button></NavLink>
          </div>
        <div className="right-steps-sucess">
          <div className="right-steps--first"></div>
          <div className="right-steps--second"></div>
          <div className="right-steps--third"></div>
        </div>
      </div>
    </main>
  );
};

export default SucessStep;
