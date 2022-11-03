
import { FiPlayCircle } from 'react-icons/fi';
import Header from '../../conponents/Header';
import Title from '../../conponents/Title';
import './new.css';

function New(){
    function handleRegister(e){
        e.preventDefault()

        alert('clicou')
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
            <select>
                <option value='Suporte'>Suporte</option>
                <option value='Visita Tecnica'>Visita Tecninca</option>
                <option value='Financeiro'>Financeiro</option>
            </select>

            <label>Status</label>
            <div className='status'>
                <input 
                type='radio'
                name='radio'
                value='aberto'
                />
                <span>Em aberto</span>

                <input
                type='radio'
                name='radio'
                value='Progresso'
                />
                <span>Progressp</span>

                <input type='radio'
                name='radio'
                value='Atendido'
                />
                <span>Atendido</span>
            </div>

            <label>Complementos</label>
            <textarea type='text'
            placeholder='Descreva seu problema (opcional)'
            />

            <button type='submit'>Registrar</button>

            </form>
           
        </div>

        </div>

        </div>
    )
}

export default New;