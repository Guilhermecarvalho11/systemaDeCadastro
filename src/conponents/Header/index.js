import "./header.css";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../Assets/avatar.png";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div>
        <img
          src= {!user.avatarUrl ? avatar : user.avatarUrl}
          alt="foto avatar"
        />
      </div>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>
      <Link to="/custumers">
        <FiUser color="#FFF" size={24} />
        Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24}/>
        Configurações
      </Link>
    </div>
  );
}

export default Header;
