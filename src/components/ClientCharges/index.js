/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import iconeOrdenar from "../../assets/order.svg";
import ClientChargesHeader from "./ClientChargesHeader";
import ClientChargesHeaderContent from "../ClientCharges/ClientChargesHeaderContent";
import Menu from "../Home/Menu";
import editTable from "../../assets/Edit-table.svg";
import deleteTable from "../../assets/delete-table.svg";
import { useEffect, useState } from "react";
import useAuthLogin from "../../Hooks/useAuthContext";
import { normalizerCharges } from "../../utils";
import { useParams } from "react-router-dom";
import notFoundImg from "../../assets/notfound.svg";
import ModalChargesDetail from "./ModalChargesDetail";
import ModalEditCharges from "../ClientsHome/ModalEditCharges";
import ModalConfirmDelet from "../ClientsHome/ModalConfirmDelet";
import ModalEditChargesSucess from "../ClientsHome/ModalEditChargesSucess";
import { ToastContainer, toast } from "react-toastify";

const ClientCharges = () => {
  const [charges, setCharges] = useState([]);
  const { getToken } = useAuthLogin();
  const { status } = useParams();
  const [copyCharges, setcopyCharges] = useState();
  const [showModalChargesDetail, setShowModalChargesDetail] = useState(false);
  const [idFilter, setIdFilter] = useState();
  const [OpenModalEditCharges, setOpenModalEditCharges] = useState(false);
  const [openModaldeleted, setOpenModalDeleted] = useState(false);
  const [selectedEditedCharge, setSelectedEditedCharge] = useState("");
  const [selectedIdDelet, setSelectedIdDelet] = useState("");
  const [OpenModalEditChargesSucess, setOpenModalEditChargesSucess] = useState(false);

  useEffect(() => {
    const getCharges = async () => {
      const response = await fetch("https://client-api-management.herokuapp.com/cobrancas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const responseData = await response.json();
      setcopyCharges(normalizerCharges(responseData));

      if (status) {
        const filteredCharges = responseData.filter((charge) => {
          return charge.status === status;
        });

        setCharges(normalizerCharges(filteredCharges));
      } else {
        setCharges(normalizerCharges(responseData));
      }
    };

    getCharges();
  }, [openModaldeleted, OpenModalEditCharges]);

  const handleSelectedId = (id) => {
    setSelectedEditedCharge(id);
    setOpenModalEditCharges(true);
  };

  const handleSelectedDelet = (id, status) => {
    if (status === "Paga" || status === "Vencida") {
      toast.error("Cobrança paga ou vencida não poderá ser excluída");
      return;
    }
    setSelectedIdDelet(id);
    setOpenModalDeleted(true);
  };


  const handleReadProfileCharges = (id) => {
    const filterId = charges.filter((x) => x.id === id);
    setIdFilter(filterId);
    setShowModalChargesDetail(true);
  };

  const [inputValue, setinputValue] = useState("");
  const [notFound, setNotFound] = useState(false);

  const handleFilter = async () => {
    const numberId = Number(inputValue);

    const filterCharges = copyCharges.filter(
      (charge) => charge.nome_cliente.toUpperCase().includes(inputValue.toUpperCase()) || charge.id === numberId
    );

    if (filterCharges.length > 0) {
      setCharges(filterCharges);
      setNotFound(false);
    } else {
      setNotFound(true);
    }

    if (!inputValue) {
      const response = await fetch(`https://client-api-management.herokuapp.com/cobrancas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const responseData = await response.json();
      setCharges(responseData);
      setNotFound(false);
    }
  };
  const handleInputValue = async (event) => {
    setinputValue(event.target.value);
    await handleFilter();
  };
  const [order, setOrder] = useState(false);

  const handleOrderA = () => {
    const loadSorted = charges.sort((a, b) => {
      return a.nome_cliente < b.nome_cliente ? -1 : a.nome_cliente > b.nome_cliente ? 1 : 0;
    });

    setOrder((prevState) => !prevState);
    setCharges(loadSorted);
  };
  const handleOrderB = () => {
    const loadSorted = charges.sort((a, b) => {
      return a.nome_cliente < b.nome_cliente ? (a.nome_cliente > b.nome_cliente ? 1 : 0) : -1;
    });
    setOrder((prevState) => !prevState);
    setCharges(loadSorted);
  };
  const handleOrderIdA = () => {
    const loadSorted = charges.sort((a, b) => {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });

    setOrder((prevState) => !prevState);
    setCharges(loadSorted);
  };
  const handleOrderidB = () => {
    const loadSorted = charges.sort((a, b) => {
      return a.id < b.id ? (a.id > b.id ? 1 : 0) : -1;
    });
    setOrder((prevState) => !prevState);
    setCharges(loadSorted);
  };

  return (
    <div className="charges-container">
      <Menu />
      {showModalChargesDetail && (
        <ModalChargesDetail
          charges={charges}
          setShowModalChargesDetail={setShowModalChargesDetail}
          idFilter={idFilter}
        />
      )}
      <div className="menu-charges">
        <ClientChargesHeader />
        <div className="section-charges">
          <ClientChargesHeaderContent handleInputValue={handleInputValue} />

          {!notFound ? (
            <table className="display-client-table">
              <thead>
                <tr>
                  <th>
                    <div className="client" onClick={order ? handleOrderA : handleOrderB}>
                      <img className="order-icon" src={iconeOrdenar} alt="order-icon" />
                      Cliente
                    </div>
                  </th>
                  <th>
                    <div className="client" onClick={order ? handleOrderIdA : handleOrderidB}>
                      <img className="order-icon" src={iconeOrdenar} alt="order-icon" />
                      ID Cob.
                    </div>
                  </th>
                  <th>Valor</th>
                  <th>Data de venc.</th>
                  <th>Status</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {charges.map((charge) => {
                  return (
                    <tr >
                      <td className="clientInfo-name">
                        <button onClick={() => handleReadProfileCharges(charge.id)}>{charge.nome_cliente}</button>
                      </td>
                      <td>{charge.id}</td>
                      <td>{charge.valor}</td>
                      <td>{charge.data_vencimento}</td>
                      <td className="charges-paid">
                        <span
                          className={
                            charge.status === "Paga"
                              ? "payment-status--charges paid"
                              : charge.status === "Pendente"
                                ? "payment-status--charges paid pendent"
                                : "payment-status--charges paid overdue"
                          }
                        >
                          {charge.status}
                        </span>
                      </td>
                      <td className="charges-description">{charge.descricao}</td>
                      <td className="edit-delete-icons">
                        <img
                          src={editTable}
                          alt="iconeCobrança"
                          onClick={() => handleSelectedId(charge.id)}
                        />
                        {<ToastContainer />}
                        <img
                          src={deleteTable}
                          alt="iconeCobrança"
                          onClick={() =>
                            handleSelectedDelet(charge.id, charge.status)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="img-notfound">
              <img src={notFoundImg} alt="notFound" />
            </div>
          )}
        </div>
        {selectedEditedCharge && OpenModalEditCharges && <ModalEditCharges id={selectedEditedCharge} onClose={() => setOpenModalEditCharges(false)} setOpenModalEditChargesSucess={setOpenModalEditChargesSucess} />}

        {selectedIdDelet && openModaldeleted && <ModalConfirmDelet id={selectedIdDelet} onClose={() => setOpenModalDeleted(false)} />}

        {OpenModalEditChargesSucess && <ModalEditChargesSucess></ModalEditChargesSucess>}
      </div>
    </div>
  );
};

export default ClientCharges;
