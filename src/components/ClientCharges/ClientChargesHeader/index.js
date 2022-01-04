/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import { useState, useEffect } from "react";
import user from "../../../assets/user.png";
import seta from "../../../assets/seta.svg";
import ModalProfile from "../../ClientsHome/ModalProfile";
import useAuthContext from "../../../Hooks/useAuthContext";

const ClientChargesHeader = () => {
  const { getToken } = useAuthContext();

  const [modalEdit, setModalEdit] = useState(false);
  const [userName, setUserName] = useState();

  const openEdit = () => {
    setModalEdit((prevState) => !prevState);
  };

  const handleRequestGetUser = async () => {
    try {
      const response = await fetch(
        `https://client-api-management.herokuapp.com/perfil`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

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
      <>
      <header className="header header-clients">
        <span>Cobranças</span>
        <div className="identification identification-clients">
          <img className="user" src={user} alt="Imagem do usuario" />
          <span>{userName}</span>
          {modalEdit && <ModalProfile />}
          <div className="position-modal">
            <button>
              <img onClick={openEdit} src={seta} alt="Seta para baixo" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
export default ClientChargesHeader;
