import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Header from "../../conponents/Header";
import Title from "../../conponents/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch} from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from '../../services/firebaseConnections';
import { format } from "date-fns";

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');


function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  useEffect(() => {

    loadChamados()


    return() =>{

    }
  }, [])

  async function loadChamados(){
    await listRef.limit(5)
    .get()
    .then((snapshot) => {
      updateSatate(snapshot)
    })
    .catch((error) => {
      console.log('Deu algum erro', error)
      setLoadingMore(false)
    })


    setLoading(false);
  }

  async function updateSatate(snapshot){
    const isCollectionEmpty = snapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(),'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado

      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true)
    }
    setLoadingMore(false);
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
              <tr>
                <td data-label='cliente'>Sujeito</td>
                <td data-label='Assunto'>Suporte</td>
                <td data-label='status'>
                  <span className="badge" style={{background: '#5cb85c'}}>Em aberto</span>
                </td>
                <td data-label='Cadastrado'>20/06/2022</td>
                <td data-label='#'>
                  <button className="action" style={{backgroundColor: '#3583f6'}}>
                    <FiSearch color="#FFF" size={17} />
                  </button>
                  <button className='action' style={{backgroundColor: '#F6a935'}}>
                    <FiEdit2 color="#FFF" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
