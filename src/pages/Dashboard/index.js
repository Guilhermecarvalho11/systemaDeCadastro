import { useState } from "react";
import "./dashboard.css";
import Header from "../../conponents/Header";
import Title from "../../conponents/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch} from "react-icons/fi";
import { Link } from "react-router-dom";

function Dashboard() {
  const [chamados, setChamados] = useState([1]);

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
