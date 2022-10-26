import './profile.css';
import Header from '../../conponents/Header';
import Title from '../../conponents/Title';

import { FiSettings } from 'react-icons/fi'

function Profile(){

    return(
        <div>
            <Header />
            <div className='content'>
                <Title name='Meu Perfil'>
                    <FiSettings size={25}/>
                </Title>
            </div>
        </div>
    )
};

export default Profile;