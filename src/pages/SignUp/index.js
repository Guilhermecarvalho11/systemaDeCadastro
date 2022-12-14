
import React, {useState, useContext} from 'react';
import logo from '../../Assets/logo.png';
import {AuthContext} from '../../contexts/auth'

import { Link } from 'react-router-dom';


function SignUp() {
  const [nome, setNome] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');



  const {signUp, loadingAuth} = useContext(AuthContext);


  function handleSubmit(e){
    e.preventDefault();

    if(nome !== '' && email !== '' && password !== ''){
      signUp(email, password, nome)
    }
  }

    return (
      <div className='container-center'>
        <div className='login'>
          <div className='logo-area'>
            <img src={logo} alt='Sistema-Logo' />
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Cadastrar uma conta</h1>
            <input type='text' placeholder='Seu nome' value={nome} onChange={ (e) => setNome(e.target.value)} />
            <input type='text' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder="********" value={password} onChange={ (e) => setPassword(e.target.value)} />
            <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>

          </form>

          <Link to='/register'>Criar uma Conta</Link>

        </div>
      </div>
    );
  }
  
  export default SignUp;