import "./styles.css";
import useAuthContext from "../../../../Hooks/useAuthContext";
import { applyPagination, formatCurrency } from "../../../../utils";

export const ChargesPaid = () => {
  const { infoCharges } = useAuthContext();
  const paidCharges = infoCharges.find((charge) => {
    return infoCharges ? charge.status_cobranca === "Paga" : "";
  });


  return (
    <div className="overdue-charges">
      <header className="title-table">
        <h3>Cobranças Pagas</h3>
        <div>
          <span className="badge">{paidCharges ? paidCharges.quantidade_cobrancas : ""}</span>
        </div>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>ID da cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {paidCharges
            ? applyPagination(paidCharges.clientes).map((charge) => {
              return (
                <tr key={charge.id}>
                  <td>{charge.nome_cliente}</td>
                  <td>{charge.id}</td>
                  <td>{formatCurrency(charge.valor)}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
      <footer>
        <a href="/charges/Paga" className="btn-see-all">
          Ver todos
        </a>
      </footer>
    </div>
  );
};

export const OverdueCharges = () => {
  const { infoCharges } = useAuthContext();

  const overdueCharges = infoCharges.find((charge) => {
    return charge.status_cobranca === "Vencida";
  });

  return (
    <div className="overdue-charges">
      <header className="title-table">
        <h3>Cobranças Vencidas</h3>
        <div>
          <span className="badge expired">{overdueCharges ? overdueCharges.quantidade_cobrancas : ""}</span>
        </div>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>ID da cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {overdueCharges
            ? applyPagination(overdueCharges.clientes).map((charge) => {
              return (
                <tr key={charge.id}>
                  <td>{charge.nome_cliente}</td>
                  <td>{charge.id}</td>
                  <td>{formatCurrency(charge.valor)}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
      <footer>
        <a href="/charges/Vencida" className="btn-see-all">
          Ver todos
        </a>
      </footer>
    </div>
  );
};



export const FutureCharges = () => {
  const { infoCharges } = useAuthContext();

  const futureCharges = infoCharges.find((charge) => {
    return charge.status_cobranca === "Pendente";
  });
  return (
    <div className="overdue-charges">
      <header className="title-table">
        <h3>Cobranças Previstas</h3>
        <div>
          <span className="badge futures">{futureCharges ? futureCharges.quantidade_cobrancas : ""}</span>
        </div>
      </header>
      <table className="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>ID da cob.</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {futureCharges
            ? applyPagination(futureCharges.clientes).map((charge) => {
              return (
                <tr key={charge.id}>
                  <td>{charge.nome_cliente}</td>
                  <td>{charge.id}</td>
                  <td>{formatCurrency(charge.valor)}</td>
                </tr>
              );
            })
            : null}
        </tbody>
      </table>
      <footer>
        <a href="/charges/Pendente" className="btn-see-all">
          Ver todos
        </a>
      </footer>
    </div>
  );
};
