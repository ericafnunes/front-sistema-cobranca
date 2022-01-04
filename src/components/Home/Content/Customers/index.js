import "./styles.css";
import iconDefaulters from "../../../../assets/icon-defaulters.svg";
import punctualCustomers from "../../../../assets/punctual-customers.svg";
import useAuthContext from "../../../../Hooks/useAuthContext";
import { useEffect, useState } from "react";
import { applyPagination} from "../../../../utils";

export const ClientChargeInfo = ({ status, chargeStatus, title, icon, iconAlt, badgeCls = "" }) => {
  const { getToken } = useAuthContext();
  const [customerInfo, setCustomerInfo] = useState([]);
  const defaulters = customerInfo.find((customer) => {
    return customer.status_clientes === chargeStatus;
  });

  useEffect(() => {
    const getCustomerInfo = () => {
      fetch(`https://client-api-management.herokuapp.com/info-clientes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {
          setCustomerInfo(dados);
        });
    };
    getCustomerInfo();
  }, [getToken, setCustomerInfo]);

  return (
    <div className="card-defaulters">
      <header className="title-table">
        <div className="icon-title">
          <img src={icon} alt={iconAlt} />
          <h3>{title} </h3>
        </div>
        <span className={`badge ${badgeCls}`}>{defaulters ? defaulters.quantidade_clients : ""} </span>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Id do Cliente</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {defaulters &&
            applyPagination(defaulters.clientes).map((client) => {
              return (
                <tr key={client.id}>
                  <td> {client.nome_cliente} </td>
                  <td> {client.id} </td>
                  <td> {client.cpf_cliente} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <footer>
        <a href={`/clients/${status}`} className="btn-see-all">
          {" "}
          Ver todos{" "}
        </a>
      </footer>
    </div>
  );
};

export const Defaulters = () => {
  return (
    <ClientChargeInfo
      chargeStatus="Inadimplente"
      title="Clientes Inadimplentes"
      icon={iconDefaulters}
      badgeCls="expired"
      iconAlt="Icone de clientes inadimplentes"
      status="Inadimplente"
    />
  );
};
export const PunctualPayment = () => {
  return (
    <ClientChargeInfo
      chargeStatus="Em dia"
      title="Clientes em dia"
      icon={punctualCustomers}
      iconAlt="Icone de clientes com pagamentos em dia"
      status="Em dia"
    />
  );
};

