import "./styles.css";
import iconeCobranca from "../../../../assets/charge.svg";
import iconeOrdenar from "../../../../assets/order.svg";
import useAuthContext from "../../../../Hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ModalRegisterCharges from "../../ModalRegisterCharges";
import ModalChargesSucess from "../../ModalChargesSucess";
import { useParams } from "react-router-dom";
import notFoundImg from "../../../../assets/notfound.svg";
import lixeira from "../../../../assets/lixeira.svg";
import ModalDeletClient from "../../ModalDeletClient";




const InfoClients = ({ notFound }) => {
  JSON.parse(localStorage.getItem("loadClients"));
  const history = useHistory();
  const { loadClients, setLoadClients } = useAuthContext();
  const [selectedClient, setSelectedClient] = useState(null);
  const [openModalChargesSucess, setOpenModalChargesSucess] = useState(false);
  const [order, setOrder] = useState(false);
  const [idClient, setIdClient] = useState("");
  const [openModalDeletClient, setOpenModalDeletClient] = useState(false);
  const { status } = useParams();

  const filteredClients = loadClients.filter((cliente) => {
    return status ? status === cliente.status : true;
  });

  const handleReadProfile = (clientId) => {
    const filterId = loadClients.filter((x) => x.id === clientId);

    if (clientId === filterId[0].id) {
      history.push(`/clientInfo/${clientId}`);
    }
  };

  const handleModalClose = () => {
    setSelectedClient(null);
  };


  const handleDeletClient = (id) => {
  setIdClient(id);
  setOpenModalDeletClient(true);
}

  const handleOrderA = () => {
    const loadSorted = loadClients.sort((a, b) => {
      return a.nome_cliente < b.nome_cliente
        ? -1
        : a.nome_cliente > b.nome_cliente
          ? 1
          : 0;
    });

    setOrder((prevState) => !prevState);
    setLoadClients(loadSorted);
  };
  const handleOrderB = () => {
    const loadSorted = loadClients.sort((a, b) => {
      return a.nome_cliente < b.nome_cliente
        ? a.nome_cliente > b.nome_cliente
          ? 1
          : 0
        : -1;
    });

    setOrder((prevState) => !prevState);
    setLoadClients(loadSorted);
  };

  return (
    <>
      <div>
        {!notFound ? (<table className="display-client-table">
          <thead>
            <tr>
              <th>
                <div
                  className="client"
                  onClick={order ? handleOrderA : handleOrderB}
                >
                  <img
                    className="order-icon"
                    src={iconeOrdenar}
                    alt="order-icon"
                  />
                  Cliente
                </div>
              </th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
              <th>Excluir Cliente</th>

            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 &&
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td className="clientInfo-name">
                    <button onClick={() => handleReadProfile(client.id)}>
                      {client.nome_cliente}
                    </button>
                  </td>
                  <td>{client.cpf_cliente}</td>
                  <td>{client.email_cliente}</td>
                  <td>{client.telefone_cliente}</td>
                  <td>
                    {client.status === "Inadimplente" ? <span className="overdue">{client.status}</span> : <span className="payment-status--charges">{client.status}</span>}
                  </td>
                  <td
                    onClick={() => setSelectedClient(client.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={iconeCobranca} alt="iconeCobrança" />
                  </td>
                  <td
                    onClick={() => handleDeletClient(client.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={lixeira} alt="iconeCobrança" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>) : (
          <div className="img-notfound">
            <img src={notFoundImg} alt="notFound" />
          </div>
        )
        }
      </div>
      {selectedClient && (
        <ModalRegisterCharges
          setOpenModalChargesSucess={setOpenModalChargesSucess}
          onClose={handleModalClose}
          clienteId={selectedClient}
        />
      )}
      {openModalChargesSucess && <ModalChargesSucess></ModalChargesSucess>}

      {idClient && openModalDeletClient && <ModalDeletClient id={idClient} onClose={() => setOpenModalDeletClient(false)}></ModalDeletClient>}
    </>
  );
};
export default InfoClients;
