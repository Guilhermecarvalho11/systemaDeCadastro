import { useState } from "react";
import "./dashboard.css";
import Header from "../../conponents/Header";
import Title from "../../conponents/Title";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function Dashboard() {
  const [chamados, setChamados] = useState([]);

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
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
