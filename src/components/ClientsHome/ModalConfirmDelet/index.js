/* eslint-disable no-unused-vars */
import "./styles.css";
import Confirm from "../../../assets/confirm.svg";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import useAuthLogin from "../../../Hooks/useAuthContext";



function ModalConfirmDelet({ onClose, id }) {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuthLogin();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose(false);
    }
  };


  async function handleDelet() {
    const response = await fetch(`https://client-api-management.herokuapp.com/cobrancas/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(await response.json());
    handleCloseModal();
  }


  return (
    <Modal open={handleOpen} onClose={handleClose} className="backdrop">
      <div className="modal-card-5">
        <img src={Confirm} alt="check-list" />
        <div>
          <h1 className="message-h5">Tem certeza que deseja excluir esta cobrança?</h1>
        </div>
        <div className="butn-delet">
          <button className="no" onClick={handleCloseModal}>
            Não
          </button>
          <button className="yes" onClick={handleDelet}>
            Sim
          </button>
        </div>
      </div>
    </Modal >
  );
}

export default ModalConfirmDelet;