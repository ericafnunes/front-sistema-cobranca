/* eslint-disable react-hooks/exhaustive-deps */
import Menu from "../Home/Menu";
import "./style.css";
import ModalProfile from "../../components/ClientsHome/ModalProfile";
import { useState, useEffect } from "react";
import seta from "../../assets/seta.svg";
import user from "../../assets/user.png";
import clients from "../../assets/clients.svg";
import ClientCharges from "./ClientCharges";
import ClientInfo from "./ClientInfo";
import { NavLink, useParams } from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext";


const ClientDetail = () => {
  const { getToken } = useAuthContext();
  const [modalEdit, setModalEdit] = useState(false);

  const [userName, setUserName] = useState();
  const openEdit = () => {
    setModalEdit((prevState) => !prevState);
  };
  
  useEffect(() => {
    
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
    handleRequestGetUser();
  }, []);

  const { loadClients } = useAuthContext();
  const { id } = useParams();
  const idNumber = Number(id);
  const load = loadClients.filter((x) => x.id === idNumber);

  return (
    <div className="clientDetail">
      <Menu />
      <div className="body">
        <div className="container-ClientDetail">
            <header className="header header-clients">
              <div className="header-clients--navlink">
                <span>
                  <NavLink to="/clients">Clientes</NavLink>
                </span>
                <span className="header-tile-complement">&gt;</span>
                <span className="span-details header-tile-complement"> Detalhes do Cliente</span>
              </div>
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
            <div className="content-clientDatail">
              <section>
                <div className="title-content">
                  <img src={clients} alt="clients" />
                  <h1>{load.length > 0 && load[0].nome_cliente}</h1>
                </div>
              </section>
              <div>
                <ClientInfo />
              </div>
              <div className="client-charges--container">
                <ClientCharges />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
