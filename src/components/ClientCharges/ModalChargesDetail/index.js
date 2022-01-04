import "./styles.css";
import closeIcon from "../../../assets/close-icon.svg";
import iconFolha from "../../../assets/icone-folha.svg";

function ModalChargesDetail({ charges, setShowModalChargesDetail, idFilter }) {

  return (
    <>
      <div className="background">
        <div className="modal-charges-detail">
          <h1 className="charges-detail-title">
            <img className="icon-folha" src={iconFolha} alt="Ícone de folha" />
            Detalhe da Cobrança
          </h1>
          <img
            onClick={() => setShowModalChargesDetail(false)}
            className="close-icon-"
            src={closeIcon}
            alt="Ícone de fechar"
          />
          {idFilter.map((charge) => {
            return (
              <>
                <div className="fields--1">
                  <label>Nome</label>
                  <span>{charge.nome_cliente}</span>
                </div>
                <div className="fields--1">
                  <label>Descrição</label>
                  <span className="descrição-">{charge.descricao}</span>
                </div>
                <div className="double--fields">
                  <div className="fields--2">
                    <label>Vencimento</label>
                    <span className="vencimento-">{charge.data_vencimento}</span>
                  </div>
                  <div className="fields--2">
                    <label>Valor</label>
                    <span className="valor-">{charge.valor}</span>
                  </div>
                  <div className="fields--2">
                    <label className="">ID Cobranças</label>
                    <span>{charge.id}</span>
                  </div>
                  <div className="fields--2">
                    <label>Status</label>
                    <button className="status-">{charge.status}</button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}


export default ModalChargesDetail;