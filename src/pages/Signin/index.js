import './signin.css';
import React, {useState, useContext} from 'react';
import { AuthContext} from '../../contexts/auth'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom';

function Signin() {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {singIn, loadingAuth} = useContext(AuthContext);
  function handleSubmit(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      singIn(email, password)
    }
  }

    return (
      <div className='container-center'>
        <div className='login'>
          <div className='logo-area'>
            <img src={logo} alt='Sistema-Logo' />
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Entrar</h1>
            <input type='text' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value) || ''} />
            <input type='password' placeholder="********" value={password} onChange={ (e) => setPassword(e.target.value)} />
            <button type='submit'>{loadingAuth ? 'Carregando' : 'Acessar'}</button>
          </form>

          <Link to='/register'>Criar uma Conta</Link>

        </div>
      </div>
    );
  }
  
  export default Signin;