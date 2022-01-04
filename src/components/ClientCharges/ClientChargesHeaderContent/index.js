import lupa from "../../../assets/lupa.svg";
import { useState } from "react";
import ModalRegisterClient from "../../ClientsHome/ContentClients";
import iconFilter from "../../../assets/iconFilter.svg";
import iconCharge from "../../../assets/iconCharges.svg";

const ClientChargesHeaderContent = ({handleInputValue}) => {
  const [showModalAdd, setShowModalAdd] = useState(false);

  return (
    <>
      <div className="header-content">
        <div className="header-content-icon-title">
          <img src={iconCharge} alt="Icone" />
          <h1 className="title-header-content">Cobranças</h1>
        </div>
        <div className="btn-input">
    
          <div className="btn-filter">
          <img src={iconFilter} alt="Icone de filtro" />
          </div>
          <input type="text" placeholder="Pesquisa" onKeyPress={(event) => handleInputValue(event)} />
          <img className="icon-search" src={lupa} alt="Lupa de pesquisa" />
        </div>
      </div>
      {showModalAdd && (
        <ModalRegisterClient onClose={() => setShowModalAdd(false)} />
      )}
    </>
  );
};

export default ClientChargesHeaderContent;
