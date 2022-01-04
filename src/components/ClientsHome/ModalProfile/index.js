import "./styles.css";
import iconeEdit from "../../../assets/edit.svg";
import iconeExit from "../../../assets/exit.svg";
import React, { useState } from "react";
import ModalEditSucess from "../../ClientsHome/ModalEditSucess";
import ModalToEdit from "../ModalEditUser";
import {useHistory} from "react-router-dom";

function ModalProfile() {
  const history = useHistory();
  const [setShowModal] = useState(false);
  const [showSucessModal, setShowSucessModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("token")
    history.push("/")
  } 
  return (

    <>
      <div className="modal-profile">
        <div className="arrow"></div>
        <img src={iconeEdit} alt="icone editar" className="modal-edit" onClick={() => setShowModalEdit(true)} />
        <img onClick={handleLogOut} src={iconeExit} alt="icone sair" className="logout" />
      </div>
      {showModalEdit && <ModalToEdit
        setShowModalEdit={setShowModalEdit}
        setShowModal={setShowModal}
        setShowSucessModal={setShowSucessModal}
      >

      </ModalToEdit>}
      {showSucessModal && <ModalEditSucess></ModalEditSucess>}
    </>
  );
}

export default ModalProfile;
