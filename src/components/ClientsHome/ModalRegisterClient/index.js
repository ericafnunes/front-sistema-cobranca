import "./styles.css";
import closeIcon from "../../../assets/close-icon.svg";
import InputMask from "react-input-mask"
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { toast } from "react-toastify";
import client from "../../../assets/client.svg";
import { useState } from "react";
import Menu from "../../Home/Menu";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthProvider from "../../../Hooks/useAuthProvider";

const updateValidation = yup.object().shape({
  name: yup.string().required("Este campo deve ser preenchido"),
  email: yup.string().email("Este e-mail não é válido.").required("Este campo deve ser preenchido"),
  cpf: yup.string().required("Este campo deve ser preenchido"),
  phone: yup.string().required("Este campo deve ser preenchido"),
});

function ModalClients({ setShowModalAdd, setShowSucessModal, showModalAdd, onClose }) {
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { getToken } = useAuthProvider();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(updateValidation),
  });

  const handleRequestRegister = async (formData) => {
    try {
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
      setEmailError("");
      setCpfError("");
      const response = await fetch(`https://client-api-management.herokuapp.com/clientes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
     

      if (responseData.mensagem === "E-mail informado já cadastrado.") {
        setEmailError("E-mail informado já cadastrado.");
      }
      if (responseData.mensagem === "CPF informado já cadastrado." || responseData.mensagem === "Deve ser informado um CPF válido." ) {
        setCpfError(responseData.mensagem);
      }
      
      if (responseData.mensagem === "Cliente cadastrado com sucesso.") {
        setShowModalAdd(false);
        setShowSucessModal(true);
        setTimeout(function () {
          setShowSucessModal(false);
        }, 2000);
      }
    } catch (error) {
      console.log("erro", error);
      toast.error("");
    }
  };

  const checkCep = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data)
      setValue("endereco", data.logradouro)
      setValue("bairro", data.bairro)
      setValue("city", data.localidade)
      setValue("uf", data.uf)
    })
  };

  return (
    <>
      <div className="backdrop">
        <Menu />
        <div className="modal-client">
          <img className="close-icon" src={closeIcon} alt="icon-close" onClick={() => setShowModalAdd(false)} />
          <form onSubmit={handleSubmit(handleRequestRegister)}>
            <h1 className="modal-title">
              <img className="register" src={client} alt="client-svg" onClick={client} />
              Cadastro do Cliente{" "}
            </h1>
            <div className="fields-">
              <label>Nome*</label>
              <input type="text" name="name" {...register("name")} placeholder="Digite o nome" />
              {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>
            <div className="fields-">
              <label>E-mail*</label>
              <input type="text" name="email" {...register("email")} placeholder="Digite o e-mail" />
              <p className="error-message">{emailError ? emailError : errors.email?.message}</p>
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
                <p className="error-message">{cpfError ? cpfError : errors.cpf?.message}</p>
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
                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="fields-">
              <label>Endereço</label>
              <input type="text" name="endereco" {...register("endereco")} placeholder="Digite o endereço" />
            </div>
            <div className="fields-">
              <label>Complemento</label>
              <input type="text" name="complemento" {...register("complemento")} placeholder="Digite o complemento" />
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
            <div className="double-field">
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
            <div className="double-field btns">
              <div className="btn-client-cancel">
                <button onClick={() => setShowModalAdd(false)} type="button">
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

export default ModalClients;