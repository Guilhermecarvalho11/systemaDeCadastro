import {useState, createContext, useEffect} from 'react';
import firebase from '../services/firebaseConnections';

export const AuthContext = createContext({});

function AuthProvider({ children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('SitemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage();

    }, [user])


// fazendo login
async function singIn(email, password){
    setLoadingAuth(true)

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
        let uid = value.user.uid;

        const userProfile = await firebase.firestore().collection('user')
        .doc(uid).get();
        console.log('profile', userProfile.data(), 'user', userProfile, 'uid', uid);

        let data = {
            uid: uid,
            nome: userProfile.data()?.nome,
            avatarUrl: userProfile.data()?.avatarUrl,
            email: value.user.email
        };
       
     

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
    })
    
    .catch((error) =>{
        console.log(error);
    })
}

//  cadastrando úsuario 
    async function signUp(email, password, nome){
   
        setLoading(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async(value) =>{
            let uid = value.user.uid;
           
            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };
                setTimeout(() => {
                    console.log('then', data);}, "2000")
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
             
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
        

    }

    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            loading,
            signUp,
            signOut,
            singIn,
            loadingAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;