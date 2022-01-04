import "./styles.css";
import { useState } from "react";
import homeMenu from "../../../assets/homeMenu.svg";
import { Link, useLocation } from "react-router-dom";
import clientMenuPink from "../../../assets/clientMenuPink.svg";
import homeMenuPink from "../../../assets/homeMenuPink.svg";
import menuClient from "../../../assets/menuClient.svg";
import menuCharges from "../../../assets/payment.svg";
import menuChargesPink from "../../../assets/chargesMenuPink.svg";

const Menu = () => {
  const location = useLocation();
  const [selectedItem] = useState(location.pathname);

  const hendleSelectdItem = (event) => {};

  return (
    <aside className="menu">
      <Link
        to="/home"
        onClick={hendleSelectdItem}
        className={`icon-menu icon-home ${selectedItem === "/home" ? "icon-active" : ""}`}
      >
        {selectedItem === "/home" ? (
          <img src={homeMenuPink} alt="Icone home" />
        ) : (
          <img src={homeMenu} alt="Icone home" />
        )}
      </Link>

      <Link to="/clients" className={`icon-menu icon-customers ${selectedItem === "/clients" ? "icon-active" : ""}`}>
        {selectedItem === "/clients" ? (
          <img src={clientMenuPink} alt="Icone de clientes" />
        ) : (
          <img src={menuClient} alt="Icone de clientes" />
        )}
      </Link>
      <Link to="/charges" className={`icon-menu icon-charges ${selectedItem === "/charges" ? "icon-active" : ""}`}>
        {selectedItem === "/charges" ? (
          <img src={menuChargesPink} alt="Folha de cobranças" />
        ) : (
          <img src={menuCharges} alt="Folha de cobranças" />
        )}
      </Link>
    </aside>
  );
};
export default Menu;
