/* eslint-disable react-hooks/exhaustive-deps */
import "./styles-modal-charges.css";
import closeIcon from "../../../assets/close-icon.svg";
import iconFolha from "../../../assets/icone-folha.svg";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import Menu from "../../Home/Menu";



import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthContext from "../../../Hooks/useAuthContext";

const updateValidation = yup.object().shape({
  description: yup.string().required("Este campo deve ser preenchido"),
  expiry: yup.string().required("Este campo deve ser preenchido"),
  value: yup.string().required("Este campo deve ser preenchido"),
});

function ModalRegisterCharges({ onClose, clienteId, setOpenModalChargesSucess }) {
  const { getToken } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(updateValidation),
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const requestClientDetails = async () => {
      try {
        const response = await fetch(`https://client-api-management.herokuapp.com/clientes/${clienteId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          return;
        }

        const responseData = await response.json();

        reset({
          name: responseData.nome_cliente,
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestClientDetails();
  }, [clienteId]);

  const handleRequestRegister = async (formData) => {
    try {
      const data = {
        descricao: formData.description,
        data_vencimento: formData.expiry,
        valor: formData.value,
        status: formData.paga,
      };

      const response = await fetch(`https://client-api-management.herokuapp.com/cobrancas/${clienteId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        return;
      }
      onClose();
      setOpenModalChargesSucess(true);
      setTimeout(function () {
        setOpenModalChargesSucess(false);
      }, 2000);
    } catch (error) {
      console.log("erro", error);
    }
  };

  return (
    <>
      <div className="backdrop">
        <Menu />
        <div className="modal-charges">
          <img className="close-icon" src={closeIcon} alt="icon-close" onClick={() => onClose(false)} />
          <form onSubmit={handleSubmit(handleRequestRegister)}>
            <h1 className="cobranca">
              <img className="icon-folha" src={iconFolha} alt="client-svg" />
              Cadastro de Cobrança
            </h1>
            <div className="fields">
              <label>Nome*</label>
              <input
                className="input-name"
                type="text"
                name="name"
                {...register("name")}
                placeholder="Digite o nome"
                disabled
              />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="fields">
              <label>Descrição*</label>
              <textarea type="text" name="description" {...register("description")} placeholder="Digite a descrição" />
              {errors.description && <p className="error-message">{errors.description?.message}</p>}
            </div>
            <div className="space-between">
              <div>
                <label>Vencimento*</label>
                <input
                  type="date"
                  name="expiry"
                  {...register("expiry")}
                  placeholder="Digite a data de vencimento"
                ></input>
                {errors.expiry && <p className="error-message">{errors.expiry?.message}</p>}
              </div>
              <div>
                <label>Valor*</label>
                <input type="number" name="value" {...register("value")} placeholder="Digite o valor" step="any"></input>
                {errors.value && <p className="error-message">{errors.value?.message}</p>}
              </div>
            </div>
            <label id="status">Status*</label>
            <div id="div-radio">
              <label id="label">
                <input
                  {...register("paga", { required: true })}
                  type="radio"
                  value="Paga"
                  checked="checked"
                  name="paga"
                />
                <span class="checkmark"></span>
                <span className="status-span">Cobrança Paga</span>
              </label>
            </div>
            <div id="div-radio">
              <label id="label">
                <input {...register("paga", { required: true })} type="radio" value="Pendente" />
                <span class="checkmark"></span>
                <span className="status-span">Cobrança Pendente</span>
              </label>
            </div>
            <div className="btns- registerChargesBtn">
              <div className="charges-cancel">
                <button onClick={handleClose} type="button">
                  Cancelar
                </button>
              </div>
              <div className="charge-aplicar">
                <button type="submit">Aplicar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalRegisterCharges;
