import "./styles.css";
import chargesPaid from "../../../../assets/icone-cobranca.svg";
import iconOverdueCharges from "../../../../assets/icone-cobranca-vencida.svg";
import iconFutureCharges from "../../../../assets/icone-cobranca-prevista.svg";
import useAuthContext from "../../../../Hooks/useAuthContext";
import { formatCurrency } from "../../../../utils";

export const Paid = () => {
  const { infoCharges } = useAuthContext();
  const paidCharges = infoCharges && infoCharges.find((charge) => {
    return infoCharges === undefined ? "" : charge.status_cobranca === "Paga";
  });

  return (
    <div className="charges-summary">
      <img src={chargesPaid} alt="" />
      <div className="summary-info">
        <h3>Cobranças Pagas</h3>
        <span>{`${paidCharges ? formatCurrency(paidCharges.valor_total) : ""}`}</span>
      </div>
    </div>
  );
};

export const Expired = () => {
  const { infoCharges } = useAuthContext();
  const expiredCharges = infoCharges && infoCharges.find((charge) => {
    return infoCharges === undefined ? "" : charge.status_cobranca === "Vencida";
  });

  return (
    <div className="charges-summary expired">
      <img src={iconOverdueCharges} alt="" />
      <div className="summary-info">
        <h3>Cobranças Vencidas</h3>
        <span>{`${expiredCharges ? formatCurrency(expiredCharges.valor_total) : ""}`}</span>
      </div>
    </div>
  );
};

export const Futures = () => {
  const { infoCharges } = useAuthContext();
  const futuresCharges = infoCharges && infoCharges.find((charge) => {
    return infoCharges === undefined ? "" : charge.status_cobranca === "Pendente";
  });
  return (
    <div className="charges-summary futures">
      <img src={iconFutureCharges} alt="" />
      <div className="summary-info">
        <h3>Cobranças Previstas</h3>
        <span>{`${futuresCharges ? formatCurrency(futuresCharges.valor_total) : ""}`}</span>
      </div>
    </div>
  );
};
