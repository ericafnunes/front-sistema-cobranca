import "../ModalRegisterCharges/styles-modal-charges.css";
import closeIcon from "../../../assets/close-icon.svg";
import iconFolha from "../../../assets/icone-folha.svg";
import "./../ModalRegisterCharges/styles-modal-charges.css";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";


import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthContext from "../../../Hooks/useAuthContext";

const updateValidation = yup.object().shape({
  name: yup.string().required("Este campo deve ser preenchido"),
  description: yup
    .string()
    .required("Este campo deve ser preenchido"),
  value: yup.string().required("Este campo deve ser preenchido"),
});


function ModalEditCharges({ onClose, clienteId, id, setOpenModalEditChargesSucess }) {
  const { getToken } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateValidation),
  });

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  useEffect(() => {
    const requestClientDetails = async () => {
      try {
        const response = await fetch(
          `https://client-api-management.herokuapp.com/cobranca/${id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const [responseData] = await response.json();

        reset({
          name: responseData.nome_cliente,
          description: responseData.descricao,
          expiry: responseData.data_vencimento,
          value: responseData.valor,
        });
      } catch (error) {
        console.log(error);
      }
    };
    requestClientDetails();
  }, [clienteId, getToken, id, reset]);

  const handleRequestRegister = async (formData) => {
    try {
      const data = {
        descricao: formData.description,
        data_vencimento: formData.expiry,
        valor: formData.value,
        status: formData.paga,
      };

      const response = await fetch(`https://client-api-management.herokuapp.com/cobrancas/${id}`, {
        method: "PUT",
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
      setOpenModalEditChargesSucess(true);
      setTimeout(function () {
        setOpenModalEditChargesSucess(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="backdrop">
        <div className="modal-charges">
          <img className="close-icon" src={closeIcon} alt="icon-close" onClick={() => handleClose(true)} />
          <form onSubmit={handleSubmit(handleRequestRegister)}>
            <h1 className="cobranca">
              <img className="icon-folha" src={iconFolha} alt="client-svg" />
              Edição de cobrança
            </h1>
            <div className="fields">
              <label>Nome*</label>
              <input disabled className="input-name" type="text" name="name" {...register("name")} />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="fields">
              <label>Descrição*</label>
              <textarea type="text" name="description" placeholder="Digite a descrição" {...register("description")} />
              {errors.description && <p className="error-message">{errors.description?.message}</p>}
            </div>
            <div className="space-between">
              <div>
                <label>Vencimento*</label>
                <input
                  type="date"
                  name="expiry"
                  placeholder="Digite a data de vencimento"
                  {...register("expiry")}
                ></input>
                {errors.expiry && <p className="error-message">{errors.expiry?.message}</p>}
              </div>
              <div>
                <label>Valor*</label>
                <input type="number" name="value" placeholder="Digite o valor" {...register("value")} step="any"></input>
                {errors.value && <p className="error-message">{errors.value?.message}</p>}
              </div>
            </div>
            <label id="status">Status*</label>
            <div id="div-radio">
              <label id="label">
                <input
                  id="check-"
                  type="radio"
                  value="Paga"
                  checked="checked"
                  name="paga"
                  {...register("paga", { required: true })}
                />
                <span class="checkmark"></span>
                <span className="status-span">Cobrança Paga</span>
              </label>
            </div>
            <div id="div-radio">
              <label id="label">
                <input type="radio" value="Pendente" {...register("paga", { required: true })} />
                <span class="checkmark"></span>
                <span className="status-span">Cobrança Pendente</span>
              </label>
            </div>
            <div className="btns-">
              <div className="charges-cancel">
                <button type="button" onClick={handleClose}>
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

export default ModalEditCharges;
