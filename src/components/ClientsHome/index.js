import "./styles.css";
import Menu from "../Home/Menu";
import HeaderClients from "./HeaderClients";
import ContentClients from "./ContentClients";

const ClientsHome = () => {
  return (
    <>
      <div className="clients-home">
        <Menu />
        <div className="body">
          <HeaderClients />
          <div className="card-clients">
            <ContentClients />
          </div>
        </div>
      </div>
    </>
  );
};
export default ClientsHome;
