/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

const useAuthProvider = () => {
  const [token, setToken] = useState();
  const [valueToken, setValueToken] = useLocalStorage("token");
  const [infoCharges, setInfoCharges] = useState([]);


  const [loadClients, setLoadClients] = useState([]);

  const handleLoadClients = async () => {
    const response = await fetch(`https://client-api-management.herokuapp.com/clientes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const responseData = await response.json();


    setLoadClients(responseData);

  };

  useEffect(() => {
    handleLoadClients();
  }, []);

  localStorage.setItem("loadClients", JSON.stringify(loadClients));

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    if (valueToken) {
      setToken(valueToken);
    }
  }, [valueToken]);


  const getInfoCharges = () => {
    fetch(`https://client-api-management.herokuapp.com/info-cobrancas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        console.log({ dados });
        setInfoCharges(dados);
      });
  };

  useEffect(() => {
    getInfoCharges();
  }, []);

  return {
    token,
    setToken,
    valueToken,
    setValueToken,
    getToken,
    loadClients,
    setLoadClients,
    handleLoadClients,
    infoCharges,
    getInfoCharges,
  };
};

export default useAuthProvider;