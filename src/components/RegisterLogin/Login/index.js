import "./style.css";
import "../../../App.css";
import homeImage from "../../../assets/home-image.png";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import useAuthLogin from "../../../Hooks/useAuthContext";
import { NavLink, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const { valueToken } = useAuthLogin();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleRequestLogin = async (event) => {
    event.preventDefault();

    if (!inputEmail || !inputPassword) {
      toast.error("Preencha os dois campos para prosseguir");
      event.preventDefault();
      return;
    }
    console.log(valueToken);
    const data = {
      email_usuario: inputEmail,
      senha: inputPassword,
    };

    const response = await fetch(
      `https://client-api-management.herokuapp.com/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();

    if (response.ok) {

      localStorage.setItem("token", responseData.token);
      history.push("/home");
    } else {
      toast.error("Email ou senha não existe");
    }
  };

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
  }, [])

  return (
    <main className="container">
      <div className="left-login">
        <img src={homeImage} alt="homeImage" />
        <h2 className="homeImage-text">
          Gerencie todos os pagamentos da sua empresa em um só lugar
        </h2>
      </div>
      <div className="right-login">
        <h1>Faça seu login!</h1>
        <ToastContainer />
        <form className="add-data__form" onSubmit={handleRequestLogin}>
          <div className="input-label">
            <label htmlFor="email">E-mail*</label>
            <input
              className="input-login"
              type="email"
              placeholder="Digite seu email"
              id="email"
              onChange={(event) => setInputEmail(event.target.value)}
            />
          </div>
          <div className="input-label">
            <div className="input-label--forgot__password">
              <label htmlFor="senha">Senha*</label>
              <a href="/">Esqueceu a senha?</a>
            </div>
            <input
              className="input-login"
              type="password"
              placeholder="Digite sua senha"
              id="senha"
              onChange={(event) => setInputPassword(event.target.value)}
            />
          </div>
          <div className="btn-home">
            <button>Entrar</button>
          </div>
          <div className="home-login">
            <span>
              Ainda não possui uma conta?
              <NavLink to="/firstStep">Cadastre-se</NavLink>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
