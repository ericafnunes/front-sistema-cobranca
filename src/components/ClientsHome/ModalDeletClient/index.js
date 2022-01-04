/* eslint-disable no-unused-vars */
import "./styles.css";
import Confirm from "../../../assets/confirm.svg";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import useAuthLogin from "../../../Hooks/useAuthContext";
import { toast, ToastContainer  } from "react-toastify";


function ModalDeletClient({ onClose, id}) {
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
    const response = await fetch(`https://client-api-management.herokuapp.com/clientes/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const responseData =  await response.json();
    if (!response.ok) {
      toast.error("O cliente não pode ser excluído.");
      return;
  }
    handleCloseModal();
  }

  return (
    <Modal open={handleOpen} onClose={handleClose} className="backdrop">
      <div className="modal-card-5">
        <img src={Confirm} alt="check-list" />
        <div>
          <h1 className="message-h5">Tem certeza que deseja excluir este cliente?</h1>
        </div>
        <div className="butn-delet">
          <button className="no" onClick={handleCloseModal}>
            Não
          </button>
          {<ToastContainer />}
          <button className="yes" onClick={handleDelet}>
            Sim
          </button>
        </div>
      </div>
    </Modal >
    
  );
}

export default ModalDeletClient;