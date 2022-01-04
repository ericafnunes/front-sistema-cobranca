/* eslint-disable no-unused-vars */
import "./styles.css";
import Check from "../../../assets/check.svg";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";

function ModalEditSucess() {
  const [open,setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal open={handleOpen}  onClose={handleClose} className="backdrop">
      <div className="modal-card-1">
        <img src={Check} alt="check-list" />
        <div>
          <h1 className="message-h1">Cadastro Alterado com sucesso!</h1>
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditSucess;
