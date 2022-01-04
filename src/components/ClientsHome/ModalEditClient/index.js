/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import closeIcon from "../../../assets/close-icon.svg";
import client from "../../../assets/client.svg";
import InputMask from "react-input-mask"
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useCallback } from "react";
import Menu from "../../Home/Menu";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthContext from "../../../Hooks/useAuthContext";

const updateValidation = yup.object().shape({
  name: yup.string().required("Este campo deve ser preenchido"),
  email: yup
    .string()
    .email("Este e-mail não é válido.")
    .required("Este campo deve ser preenchido"),
  cpf: yup.string().required("Este campo deve ser preenchido"),
  phone: yup.string().required("Este campo deve ser preenchido"),
});

function ModalEditClient({
  onClose, clientId, setShowModalEdit, setShowSucessModal, setOpenModalEditClientSucess, setShowEditClient
}) {
  const { getToken } = useAuthContext();
  const [cpfError, setCpfError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(updateValidation),
  });

  const handleClose = () => {
    if (onClose) {
      onClose(false);
    }
  };

  const handleRequestGetUser = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `https://client-api-management.herokuapp.com/clientes/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const responseData = await response.json();

        console.log({ responseData });

        reset({
          name: responseData.nome_cliente,
          email: responseData.email_cliente,
          endereco: responseData.logradouro,
          phone: responseData.telefone_cliente,
          cpf: responseData.cpf_cliente,
          cep: responseData.cep,
          bairro: responseData.bairro,
          city: responseData.cidade,
          uf: responseData.estado,
          complemento: responseData.complemento,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [getToken, reset]
  );

  useEffect(() => {
    handleRequestGetUser(clientId);
  }, []);



  const handleRequestRegister = async (formData) => {
    const data = {
      nome_cliente: formData.name,
      email_cliente: formData.email,
      cpf_cliente: formData.cpf,
      telefone_cliente: formData.phone,
      logradouro: formData.endereco,
      cep: formData.cep,
      bairro: formData.bairro,
      cidade: formData.city,
      estado: formData.uf,
      complemento: formData.complemento,
    };
    setCpfError("");
    try {

      const response = await fetch(
        `https://client-api-management.herokuapp.com/clientes/${clientId}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();


      if (responseData.mensagem === "CPF informado já cadastrado." || responseData.mensagem === "Deve ser informado um CPF válido.") {
        setCpfError(responseData.mensagem);
      }

      if (!response.ok) {
        return;
      }
      onClose();
      setOpenModalEditClientSucess(true);
      setTimeout(function () {
        setOpenModalEditClientSucess(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCep = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("endereco", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
      });
  };

  return (
    <>
      <div className="backdrop">
        <Menu />
        <div className="modal-client">
          <h1 className="modal-title">
            <img
              className="client-svg"
              src={client}
              alt="client-svg"
              onClick={client}
            />
            Editar Cliente
          </h1>
          <img
            className="close-icon"
            src={closeIcon}
            alt="icon-close"
            onClick={() => onClose(false)}
          />

          <form onSubmit={handleSubmit(handleRequestRegister)}>
            <div className="fields-">
              <label>Nome*</label>
              <input
                type="text"
                name="name"
                {...register("name")}
                placeholder="Digite o nome"
              />
              {errors.name && (
                <p id="errorEditClient" className="error-message">{errors.name.message}</p>
              )}
            </div>

            <div className="fields-">
              <label>E-mail*</label>
              <input
                type="text"
                name="email"
                {...register("email")}
                placeholder="Digite o email"
              />
              {errors.email && (
                <p id="errorEditClient" className="error-message">{errors.email?.message}</p>
              )}
            </div>
            <div className="double-field">
              <div>
                <label>CPF*</label>
                <Controller
                  defaultValue=""
                  rules={{
                    required: true, min: 14,
                  }}
                  render={({ field: { value } }) => (
                    <InputMask
                      className="fields-1"
                      mask="999.999.999-99"
                      maskChar=""
                      value={value}
                      name="cpf"
                      {...register("cpf")}
                      placeholder="Digite o CPF"
                    ></InputMask>
                  )}
                  control={control}
                  name="cpf"
                />
                <p id="errorEditClient" className="error-message">{cpfError ? cpfError : errors.cpf?.message}</p>
              </div>
              <div>
                <label>Telefone*</label>
                <Controller
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value } }) => (
                    <InputMask
                      className="fields-1"
                      mask="(99)9999-9999"
                      value={value}
                      type="text"
                      name="phone"
                      {...register("phone")}
                      placeholder="Digite o telefone"
                    ></InputMask>
                  )}
                  control={control}
                  name="phone"
                />
                {errors.phone && (
                  <p id="errorEditClient" className="error-message">{errors.phone?.message}</p>
                )}
              </div>
            </div>
            <div className="fields-">
              <label>Endereço</label>
              <input
                type="text"
                name="endereco"
                {...register("endereco")}
                placeholder="Digite o endereço"
              />
            </div>
            <div className="fields-">
              <label>Complemento</label>
              <input
                type="text"
                name="complemento"
                {...register("complemento")}
                placeholder="Digite o complemento"
              />
            </div>
            <div className="double-field">
              <div>
                <label>CEP</label>
                <input
                  className="fields-number"
                  type="text"
                  name="cep"
                  {...register("cep")}
                  placeholder="Digite o CEP"
                  onBlur={checkCep}
                ></input>
              </div>
              <div>
                <label>Bairro</label>
                <input
                  className="fields-number"
                  type="text"
                  name="bairro"
                  {...register("bairro")}
                  placeholder="Digite o bairro"
                ></input>
              </div>
            </div>
            <div className="space-between">
              <div>
                <label>Cidade</label>
                <input
                  className="fields-number"
                  id="div-city"
                  type="text"
                  name="city"
                  {...register("city")}
                  placeholder="Digite a cidade"
                ></input>
              </div>
              <div>
                <label>UF</label>
                <input
                  className="fields-number"
                  id="div-uf"
                  type="text"
                  name="uf"
                  {...register("uf")}
                  placeholder="Digite a UF"
                ></input>
              </div>
            </div>
            <div className="double-field btns-">
              <div className="btn-client-cancel">
                <button onClick={handleClose} type="button">
                  Cancelar
                </button>
              </div>
              <div className="btn-client-aplicar">
                <button type="submit">Aplicar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditClient;
