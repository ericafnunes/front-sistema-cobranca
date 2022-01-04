/* eslint-disable react-hooks/exhaustive-deps */
import "./styles.css";
import closeIcon from "../../../assets/close-icon.svg";
import { useForm, Controller } from "react-hook-form";
import React, { useState, useEffect, useCallback } from "react";
import hideEye from "../../../assets/hideEye.svg";
import InputMask from "react-input-mask";
import openEye from "../../../assets/openEye.svg";
import useAuthContext from "../../../Hooks/useAuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";

const updateValidation = yup.object().shape({
  name: yup.string().required("Este campo deve ser preenchido"),
  email: yup
    .string()
    .email("Este e-mail não é válido.")
    .required("Este campo deve ser preenchido."),
  password: yup.string(),
});

function ModalToEdit({ setShowSucessModal, setShowModalEdit }) {
  const { getToken } = useAuthContext();

  const [showPassword, setShowPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [cpfError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateValidation),
  });

  const handleRequestGetUser = useCallback(async () => {
    try {
      const response = await fetch(
        `https://client-api-management.herokuapp.com/perfil`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const responseData = await response.json();

      console.log({ responseData });

      reset({
        name: responseData.nome_usuario,
        email: responseData.email_usuario,
        password: responseData.senha,
        newpassword: responseData.senha,
        cpf: responseData.cpf_usuario,
        phone: responseData.telefone_usuario,
      });
    } catch (error) {
      console.log(error);
    }
  }, [getToken, reset]);

  useEffect(() => {
    handleRequestGetUser();
  }, []);

  const handleRequestEditUser = async (formData) => {
    const data = {
      nome_usuario: formData.name,
      email_usuario: formData.email,
      senha: formData.password ? formData.password : undefined,
      cpf_usuario: formData.cpf,
      telefone_usuario: formData.phone,
    };

    try {

      const response = await fetch(
        `https://client-api-management.herokuapp.com/perfil`,

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


      if (!response.ok) {
        toast.error(responseData.mensagem);
        return;
      }
      setShowSucessModal(true);
      setShowModalEdit(false);
      setTimeout(function () {
        // setShowModalEdit(false);
        setShowSucessModal(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="backdrop" setShowModalEdit={setShowModalEdit}>
      <div className="modal-card">
        <ToastContainer />
        <h1 className="modal-edit-h1">Edite seu cadastro</h1>
        <img
          className="close-icon"
          src={closeIcon}
          alt="icon-close"
          onClick={() => setShowModalEdit(false)}
        />
        <form onSubmit={handleSubmit(handleRequestEditUser)}>
          <div className="fields">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              {...register("name")}
              placeholder="Digite seu nome"
            />
            <p className="error-message">{errors.name?.message}</p>
          </div>

          <div className="fields">
            <label>E-mail</label>
            <input
              type="text"
              name="email"
              {...register("email")}
              placeholder="Digite seu e-mail"
            />
            <p className="error-message">{errors.email?.message}</p>
          </div>
          <div className="space-between">
            <div className="fields">
              <label>CPF</label>
              <Controller
                defaultValue=""
                rules={{
                  required: true, min: 14,
                }}
                render={({ field: { value } }) => (
                  <InputMask
                    mask="999.999.999-99"
                    maskChar=""
                    id="div-between-1"
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
            <div className="fields">
              <label>Telefone</label>
              <input
                className="fields-number"
                id="div-between-2"
                type="text"
                name="phone"
                {...register("phone")}
                placeholder="Digite seu telefone"
              ></input>
              <p className="error-message">{ }</p>
            </div>
          </div>
          <div className="fields">
            <label>Nova senha</label>
            <input
              type={showPassword && "password"}
              name="password"
              {...register("password")}
              placeholder="Digite sua nova senha"
            />
            <img
              className="eye-2"
              src={showPassword ? hideEye : openEye}
              alt="olho fechado"
              onClick={() => setShowPassword(prevState => !prevState)}
            />
            <p className="error-message">{errors.password?.message}</p>
          </div>
          <div className="fields">
            <label>Confirmar senha</label>
            <input
              type={confirmPassword && "password"}
              name="newpassword"
              {...register("newpassword")}
              placeholder="Confirme sua nova senha"
            />
            <img
              className="eye-2"
              src={confirmPassword ? hideEye : openEye}
              alt="olho fechado"
              onClick={() => setConfirmPassword(prevState => !prevState)}
            />
            <p className="error-message">{errors.newpassword?.message}</p>
          </div>
          <div className="button-post">
            <button type="submit">Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalToEdit;
