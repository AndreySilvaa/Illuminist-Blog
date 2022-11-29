import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const UserAuthentication = () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    const createUser = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try{
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {   // Foi utilizado essa função pois o firebase não armazena o nome do usuário na autenticação. É preciso atualizar o perfil e adicionar essa propriedade
                displayName: data.displayName
            })

            setLoading(false)

            return user

        }catch(error){
            console.log(error.message)

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado"
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage)

        }

    }

    const login = (email, password) =>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            //console.log(user)
        })
        .catch((error) => {
            let systemError = ''
            if(error.message.includes('password')){
                systemError = 'Senha incorreta'
            }else if(error.message.includes('user-not-found')){
                systemError = 'Usuário não encontrado!'
            }else{
                systemError = 'Oops, algo deu errado, tente novamente mais tarde!'
            }

            setError(systemError)
        })
    }

    const logout = () =>{
        let check = window.confirm('Deseja sair da sua conta?')
        if(check){
            signOut(auth)
        }else{
            return
        }
        
    }



    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        loading,
        error,
        login,
        logout
    }

}