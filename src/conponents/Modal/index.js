import React from 'react';
import './modal.css';
import { FiX } from 'react-icons/fi';



function Modal({conteudo, close}){
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do Chamados</h2>

                    <div className='row'>
                        <span>Cliente: <a>{conteudo.cliente}</a></span>

                    </div>

                    <div className='row'>
                        <span>Assunto: <a>{conteudo.assunto}</a></span>
                        <span>Cadastrado em: <a>{conteudo.createdFormated}</a></span>

                    </div>

                    <div className='row'>
                        <span>Status <a style={{color: '#FFF', backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</a></span>
                    </div>

                    {conteudo.complemento !== "" && (
                        <>
                        <h3>Complemento</h3>
                        <p>{conteudo.complemento}</p>
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}

export default Modal;