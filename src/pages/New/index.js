
import { FiPlayCircle } from 'react-icons/fi';
import Header from '../../conponents/Header';
import Title from '../../conponents/Title';
import {useState} from 'react';
import './new.css';

function New(){
    const [ assunto, setAssunto] = useState('suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');

    function handleRegister(e){
        e.preventDefault()

        alert('clicou')
    }

    // chamado quando troca o assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
        console.log(e.target.value)
    }

    //chamado quando troca o Status
    function handleOptionChange(e){
        setStatus(e.target.value)
        console.log(e.target.value)
    }



    return(
        <div>
            <Header />
        
        <div className="content">
            <Title name='Novo Chamado'>
                <FiPlayCircle size={25} />
            </Title>

        <div className='container'>

            <form className='form-profile' onSubmit={handleRegister}>

            <label>Cliente</label>
            <select>
                <option key={1} value={1}>
                    Sujeito Programador
                </option>
            </select>

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
                <option value='Suporte'>Suporte</option>
                <option value='Visita Tecnica'>Visita Tecninca</option>
                <option value='Financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className='status'>
                <input 
                type='radio'
                name='radio'
                value='Aberto'
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
                />
                <span>Em aberto</span>

                <input
                type='radio'
                name='radio'
                value='Progresso'
                onChange={ handleOptionChange}
                checked={status === 'Progresso'}
                />
                <span>Progresso</span>

                <input type='radio'
                name='radio'
                value='Atendido'
                onChange={ handleOptionChange}
                checked={status === 'Atendido'}
                />
                <span>Atendido</span>
            </div>

            <label>Complementos</label>
            <textarea type='text'
            placeholder='Descreva seu problema (opcional)'
            value={complemento}
            onChange={(e) => setComplemento(e.target.value) }
            />

            <button type='submit'>Registrar</button>

            </form>
           
        </div>

        </div>

        </div>
    )
}

export default New;