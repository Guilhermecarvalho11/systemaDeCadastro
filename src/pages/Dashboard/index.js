import {useContext} from "react";
import Header from '../../conponents/Header';

import {AuthContext} from "../../contexts/auth";

function Dashboard() {
  const { signOut } = useContext(AuthContext);
 

  
  return (
    <div>
      <Header />
      <h1>Pág de Dashboard</h1>
      <button onClick={ () => signOut() }>Fazer Logout</button>
    </div>
  );
}

export default Dashboard;
