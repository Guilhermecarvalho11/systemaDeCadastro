import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Header from "../../conponents/Header";
import Title from "../../conponents/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "../../services/firebaseConnections";
import { format } from "date-fns";
import Modal from "../../conponents/Modal"

const listRef = firebase
  .firestore()
  .collection("chamados")
  .orderBy("created", "desc");

function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    loadChamados();

    return () => {};
  }, []);

  async function loadChamados() {
    await listRef
      .limit(5)
      .get()
      .then((snapshot) => {
        updateSatate(snapshot);
      })
      .catch((error) => {
        console.log("Deu algum erro", error);
        setLoadingMore(false);
      });

    setLoading(false);
  }

  async function updateSatate(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pegando o ultimo documento buscado

      setChamados((chamados) => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

 async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5)
    .get()
    .then((snapshot) =>{
      updateSatate(snapshot)
    })
  }

  function togglePostalModal(item){
    setShowPostModal(!showPostModal) //trocando de true pra false
    setDetail(item);
  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="atendimento">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container-dashboard">
            <span>Buscando Chamados</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container-dashboard">
            <span> Nenhum chamdo registrado</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Clientes</th>
                  <th scope="col">Assuntos</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>

              <tbody>
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="status">
                        <span
                          className="badge"
                          style={{ backgroundColor: item.status === 'Aberto' ? "#5cb85c" : '#999' }}>                        
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{ backgroundColor: "#3583f6" }} onClick={() => togglePostalModal(item)}>                       
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <button
                          className="action"
                          style={{ backgroundColor: "#F6a935" }}>                       
                          <FiEdit2 color="#FFF" size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {loadingMore && <h3 style={{textAling: 'center', marginTop:15}}>Buscando Dados</h3>}

            { !loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar Mais</button>}
          </>
        )}
      </div>

      {showPostModal && (
        <Modal 
        conteudo={detail} 
        close={togglePostalModal} />
      )}
    </div>
  );
}

export default Dashboard;
