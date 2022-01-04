/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import seta from "../../../assets/seta.svg";
import user from "../../../assets/user.png";
import { useState, useEffect } from "react";
import ModalProfile from "../../ClientsHome/ModalProfile";
import useAuthContext from "../../../Hooks/useAuthContext";

const Header = () => {
  const { getToken } = useAuthContext();

  const [modalEditHome, setModalEditHome] = useState(false);
  const [userName, setUserName] = useState();

  const openEditHome = () => {
    setModalEditHome(!modalEditHome);
  };

  const handleRequestGetUser = async () => {
    try {
      const response = await fetch(`https://client-api-management.herokuapp.com/perfil`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const responseData = await response.json();

      const splitName = responseData.nome_usuario.split(" ");
      setUserName(splitName[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRequestGetUser();
  }, []);

  return (
    <header className="header">
      <h1 className="title-header">Resumo das cobranças</h1>
      <div className="identification">
        <img className="user" src={user} alt="Imagem do usuario" />
        <span>{userName}</span>
        <button onClick={openEditHome}>
          <img src={seta} alt="Seta para baixo" />
        </button>
        {modalEditHome && <ModalProfile />}
      </div>
    </header>
  );
};
export default Header;