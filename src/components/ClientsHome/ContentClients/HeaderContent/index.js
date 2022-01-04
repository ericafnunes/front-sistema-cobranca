/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import iconClients from "../../../../assets/headerCients.svg";
import lupa from "../../../../assets/lupa.svg";
import iconAdd from "../../../../assets/icon-add.svg";
import { useEffect, useState } from "react";
import ModalRegisterClient from "../../ModalRegisterClient";
import iconFilter from "../../../../assets/iconFilter.svg";
import ModalRegisterSucess from "../../../ClientsHome/ModalRegisterSucess";
import useAuthContext from "../../../../Hooks/useAuthContext";

const HeaderContent = ({ notFound, setNotFound }) => {
  const { handleLoadClients, loadClients, setLoadClients, getToken } =
    useAuthContext();

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showSucessModal, setShowSucessModal] = useState(false);
  const [inputValue, setinputValue] = useState("");


  const handleInputValue = async (event) => {
    setinputValue(event.target.value.toUpperCase());
    const filterClient = loadClients.filter(
      (client) =>
        client.nome_cliente.toUpperCase().includes(inputValue) ||
        client.cpf_cliente.includes(inputValue) ||
        client.email_cliente.includes(inputValue)
    );


    if (!filterClient.length) {
      setNotFound(true);
      return;
    }



    setLoadClients(filterClient);
    setNotFound(false);

    if (!inputValue) {
      const response = await fetch(
        `https://client-api-management.herokuapp.com/clientes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const responseData = await response.json();
      setLoadClients(responseData);
      setNotFound(false);
    }
  };

  const handleModalAddClose = () => {
    setShowModalAdd(false);
    handleLoadClients();
  };

  useEffect(() => {
    async function refreshClients() {
      const response = await fetch(
        `https://client-api-management.herokuapp.com/clientes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const responseData = await response.json();
      setLoadClients(responseData);
    }
    refreshClients();
  }, [showSucessModal])

  return (
    <>
      <div className="header-content">
        <div className="header-content-icon-title">
          <img src={iconClients} alt="Icone" />
          <h1 className="title-header-content">Clientes</h1>
        </div>
        <div className="btn-input">
          <button
            onClick={() => setShowModalAdd(true)}
            className="btn-add-client"
          >
            <img src={iconAdd} alt="Icone de adicionar" />
            Adicionar cliente
          </button>
          <div className="btn-filter">
            <img src={iconFilter} alt="Icone de filtro" />
          </div>
          <input
            className="search-btn"
            type="text"
            placeholder="Pesquisa"
            onKeyDown={handleInputValue}
            notFound={notFound}
          />
          <img className="icon-search" src={lupa} alt="Lupa de pesquisa" />
        </div>
      </div>
      {showModalAdd && (
        <ModalRegisterClient
          setShowModalAdd={setShowModalAdd}
          setShowSucessModal={setShowSucessModal}
          onClose={handleModalAddClose}
        />
      )}
      {showSucessModal && <ModalRegisterSucess />}
    </>
  );
};

export default HeaderContent;
