import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import {toast} from 'react-toastify';
import firebase from "../../services/firebaseConnections";
import { FiPlayCircle } from "react-icons/fi";
import Header from "../../conponents/Header";
import Title from "../../conponents/Title";
import { useHistory, useParams } from "react-router-dom";
import "./new.css";

function New() {
  const [customerSelected, setCustomerSelected] = useState(0);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [assunto, setAssunto] = useState("suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");
  const [idCustomers, setIdCustomers] = useState(false)

  const { user } = useContext(AuthContext);

  const {id} =useParams();
  const history = useHistory();




  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection("customers")
        .get()
        .then((snapshot) => {
          let lista = [];
   
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });

          if (lista.length === 0) {
            console.log("nenhuma empresa encontrada");
            setCustomers([{ id: '1', nomeFantasia: "Freela" }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

          if(id){
            loadId(lista)
          }

        })
        .catch((error) => {
          console.log("Deu erro", error);
          setLoadCustomers(false);
          setCustomers([{ id: '1', nomeFantasia:''}])
        });

    }

    loadCustomers();
  }, []);

  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento)

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
      setCustomerSelected(index)
      setIdCustomers(true)
    })
    .catch((error) => {
      console.log("erro no ID passado", error)
      setIdCustomers(false)
    })
  }

 async function handleRegister(e) {
    e.preventDefault();

    if(idCustomers){
      await firebase.firestore().collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() => {
        toast.success('Chamado Editado com Sucesso')
        setCustomerSelected(0)
        setComplemento('')
        history.push('/dashboard')
      })
      .catch((error)=>{
        toast.error('Ops erro ao registrar, tente mais tarde.')
        console.log(error)
      })

      return;
    }
    

    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then(() => {
      toast.success('Chamado criado com sucesso!');
      setComplemento('');
      setCustomerSelected(0);
      history.push('/dashboard')
    })
    .catch((error) => {
      toast.error('Ops, erro ao Registrar, tente novamente mais tarde')
      console.log(error)
    })
  }

  // chamado quando troca o assunto
  function handleChangeSelect(e) {
    setAssunto(e.target.value);

  }

  //chamado quando troca o Status
  function handleOptionChange(e) {
    setStatus(e.target.value);

  }

  //chamado quando troca o cliente
  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
    
  }
  

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlayCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>

            {loadCustomers ? (
              <input
                type="text"
                disabled={true}
                value="Carregando Clientes..."
              />
            ) : (
              <select value={customerSelected } onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecninca</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complementos</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
