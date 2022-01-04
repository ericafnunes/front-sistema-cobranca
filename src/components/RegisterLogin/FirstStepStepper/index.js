import "./style.css";

const FirstStepStepper = () => {
  return (
    <div className="vertical-container">
      <div className="steps">
        <div className="step-cicle">
          <div className="step-cicle__firstStep--first"></div>
        </div>
        <div className="step-direct"></div>
        <div className="step-cicle">
          <div className="step-cicle__firstStep--second"></div>
        </div>

        <div className="step-direct"></div>
        <div className="step-cicle">
          <div className="step-cicle__firstStep--third"></div>
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
