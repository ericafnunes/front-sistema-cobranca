/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import iconEdit from "../../../assets/edit.svg";
import iconDelete from "../../../assets/lixeira.svg";
import iconAdd from "../../../assets/icon-add.svg";
import iconDownUp from "../../../assets/baixo-cima.svg";
import { useEffect, useState } from "react";
import { normalizerCharges } from "../../../utils";
import { useParams } from "react-router-dom";
import useAuthContext from "../../../Hooks/useAuthContext";
import ModalRegisterCharges from "../../ClientsHome/ModalRegisterCharges";
import ModalChargesSucess from "../../ClientsHome/ModalChargesSucess";
import ModalChargesDetail from "../../ClientCharges/ModalChargesDetail";
import ModalEditCharges from "../../ClientsHome/ModalEditCharges";
import ModalEditChargesSucess from "../../ClientsHome/ModalEditChargesSucess";
import ModalConfirmDelet from "../../ClientsHome/ModalConfirmDelet";
import { ToastContainer, toast } from "react-toastify";

const ClientCharges = ({ charges }) => {
  const [customerCharges, setCustomerCharges] = useState([]);
  const { getToken } = useAuthContext();
  const [openModalCharges, setOpenModalCharges] = useState(false);
  const [openModalChargesSucess, setOpenModalChargesSucess] = useState(false);
  const [showModalChargesDetail, setShowModalChargesDetail] = useState(false);
  const [idFilter, setIdFilter] = useState();
  const [openModalEditarCharges, setOpenModalEditarCharges] = useState(false);
  const [openModalEditChargesSucess, setOpenModalEditChargesSucess] = useState(false);
  const [openModalDelet, setOpenModalDelet] = useState(false);
  const [saveChargeId, setSaveChargeId] = useState("");
  const [selectedCharge, setSelectedCharge] = useState("");

  const { id } = useParams();


  useEffect(() => {
    const getChargesId = () => {
      fetch(`https://client-api-management.herokuapp.com/cobrancas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((resposta) => resposta.json())
        .then((dados) => {

          setCustomerCharges(normalizerCharges(dados));
        });
    };

    getChargesId();
  }, [openModalChargesSucess, openModalEditarCharges, openModalDelet]);

  const handleSelectChargeForEdit = (id) => {
    setSaveChargeId(id);
    setOpenModalEditarCharges(true);
  };

  const handleSelectChargeForDelet = (id, status) => {
    if (status === "Paga" || status === "Vencida") {
      toast.error("Cobrança paga ou vencida não poderá ser excluída");
      return;
    }
    setSelectedCharge(id);
    setOpenModalDelet(true);
  };

  const handleReadProfileCharges = (id) => {
    const filterId = customerCharges.filter((x) => x.id === id);
    setIdFilter(filterId);
    setShowModalChargesDetail(true);
  };

  return (
    <>
      {showModalChargesDetail && (
        <ModalChargesDetail
          charges={customerCharges}
          setShowModalChargesDetail={setShowModalChargesDetail}
          idFilter={idFilter}
        />
      )}
      <div className="client-charges-container">
        <header className="client-charges-header">
          <h2>Cobranças do Cliente</h2>
          <button onClick={() => setOpenModalCharges(true)}>
            <img src={iconAdd} alt="Icone de adicionar" />
            Nova cobrança
          </button>
        </header>
        <table className="table">
          <thead>
            <tr>
              <th>
                <img src={iconDownUp} alt="" />
                ID Cob.
              </th>
              <th>
                <img src={iconDownUp} alt="" />
                Data de venc.
              </th>
              <th>Valor</th>
              <th className="th-status">Status</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {customerCharges.length <= 0 ? (
              <p className="no-charges">Cliente sem Cobranças</p>
            ) : (
              customerCharges.map((customerCharge) => {
                return (
                  <tr style={{ cursor: "pointer" }}>
                    <td onClick={() => handleReadProfileCharges(customerCharge.id)}>{customerCharge.id}</td>
                    <td onClick={() => handleReadProfileCharges(customerCharge.id)}>{customerCharge.data_vencimento}</td>
                    <td onClick={() => handleReadProfileCharges(customerCharge.id)}>{customerCharge.valor}</td>
                    <td className="charges-paid">
                      <span
                        className={
                          customerCharge.status === "Paga"
                            ? "payment-status--charges paid"
                            : customerCharge.status === "Pendente"
                              ? "payment-status--charges paid pendent"
                              : "payment-status--charges paid overdue"
                        }
                      >
                        {customerCharge.status}
                      </span>
                    </td>
                    <td>{customerCharge.descricao}</td>
                    <td className="table-actions">
                      <img
                        src={iconEdit}
                        alt="Icone de Editar"
                        onClick={() =>
                          handleSelectChargeForEdit(customerCharge.id)
                        }
                      />
                      {<ToastContainer />}
                      <img
                        src={iconDelete}
                        alt="Iconde de Excluir"
                        onClick={() =>
                          handleSelectChargeForDelet(
                            customerCharge.id,
                            customerCharge.status
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {saveChargeId && openModalEditarCharges && (
        <ModalEditCharges
          id={saveChargeId}
          setOpenModalEditChargesSucess={setOpenModalEditChargesSucess}
          onClose={() => setOpenModalEditarCharges(false)}
        />
      )}

      {openModalCharges && (
        <ModalRegisterCharges
          setOpenModalChargesSucess={setOpenModalChargesSucess}
          clienteId={id}
          onClose={() => setOpenModalCharges(false)}
        />
      )}
      {openModalChargesSucess && <ModalChargesSucess />}

      {openModalEditChargesSucess && <ModalEditChargesSucess />}

      {selectedCharge && openModalDelet && (
        <ModalConfirmDelet
          id={selectedCharge}
          onClose={() => setOpenModalDelet(false)}
        />
      )}
    </>
  );
};
export default ClientCharges;
