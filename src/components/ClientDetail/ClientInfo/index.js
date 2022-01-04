/* eslint-disable react-hooks/exhaustive-deps */
import editIcon from "../../../assets/iconEdit-Info.svg";
import "./style.css";
import useAuthContext from "../../../Hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ModalEditClient from "../../ClientsHome/ModalEditClient";
import ModalEditClientSucess from "../../ClientsHome/ModalEditClientSucess";


const ClientInfo = () => {
  const { loadClients, handleLoadClients } = useAuthContext();
  const [showEditClient, setEditClient] = useState(false);
  const [openModalEditClientSucess, setOpenModalEditClientSucess] = useState(false);

  const { id } = useParams();
  const idNumber = Number(id);
  const temp = loadClients.filter((x) => x.id === idNumber);


  useEffect(() => {
    const handleLoad = async () => {
      await handleLoadClients();
    };
    handleLoad();
  }, [openModalEditClientSucess]);

  return (
    <div className="clientInfo-container">
      <div className="header-info">
        <h2>Dados dos Clientes</h2>
        <button onClick={() => setEditClient(true)}>
          <img src={editIcon} alt="editIcon" />
          Editar Cliente
        </button>
      </div>
      <div className="user-info">
        <div className="user-info__column">
          <div>
            <p>E-mail</p>
            <span>
              {temp.length > 0 &&
                (temp[0].email_cliente
                  ? temp[0].email_cliente
                  : "não informado")}
            </span>
          </div>
          <div>
            <p>Endereço</p>
            <span>
              {temp.length > 0 &&
                (temp[0].logradouro ? temp[0].logradouro : "não informado")}
            </span>
          </div>
        </div>
        <div className="user-info__column">
          <div>
            <p>Telefone</p>
            <span>
              {temp.length > 0 &&
                (temp[0].telefone_cliente
                  ? temp[0].telefone_cliente
                  : "não informado")}
            </span>
          </div>
          <div>
            <p>Bairro</p>
            <span>
              {temp.length > 0 &&
                (temp[0].bairro ? temp[0].bairro : "não informado")}
            </span>
          </div>
        </div>
        <div className="user-info__column">
          <div>
            <p>CPF</p>
            <span>
              {temp.length > 0 &&
                (temp[0].cpf_cliente ? temp[0].cpf_cliente : "não informado")}
            </span>
          </div>
          <div>
            <p>Complemento</p>
            <span>
              {temp.length > 0 &&
                (temp[0].complemento ? temp[0].complemento : "não informado")}
            </span>
          </div>
        </div>

        <div className="last-info">
          <div className="user-info__column">
            <div>
              <p>CEP</p>
              <span>
                {temp.length > 0 &&
                  (temp[0].cep ? temp[0].cep : "não informado")}
              </span>
            </div>
          </div>
          <div className="user-info__column">
            <div>
              <p>Cidade</p>
              <span>
                {temp.length > 0 &&
                  (temp[0].cidade ? temp[0].cidade : "não informado")}
              </span>
            </div>
          </div>
          <div className="user-info__column">
            <div>
              <p>UF</p>
              <span>
                {temp.length > 0 &&
                  (temp[0].estado ? temp[0].estado : "não informado")}
              </span>
            </div>
            {showEditClient && (
              <ModalEditClient setOpenModalEditClientSucess={setOpenModalEditClientSucess}
                clientId={id}
                onClose={() => setEditClient(false)}
              ></ModalEditClient>
            )}
            {openModalEditClientSucess && <ModalEditClientSucess />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
