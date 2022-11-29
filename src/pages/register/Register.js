import React from 'react'
import { useState } from 'react'
import { UserAuthentication } from '../../hooks/userAuthentication'


// CSS
import styles from './Register.module.css'

const Cadastro = () => {
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState(null)
    const {createUser, loading, error} = UserAuthentication()


    const handleForm = (e) => {
        e.preventDefault()
        setFormError('')
        if(confirmPassword !== password){
            setFormError("As senhas precisam ser iguais")
            return
        }

        const users = {
            displayName,
            password,
            email
        }

        console.log(users)
        createUser(users)
    }

  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleForm}>
            <label htmlFor="name">
                <span>Nome:</span>
                <input type="text" name="name" id="name" placeholder='Digite seu nome' value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
            </label>

            <label htmlFor="email">
                <span>E-mail:</span>
                <input type="email" name="email" id="email" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label htmlFor="password">
                <span>Senha:</span>
                <input type="password" name="password" id="password" placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            <label htmlFor="ConfirmPassword">
                <span>Confirmar senha:</span>
                <input type="password" name="ConfirmPassword" id="ConfirmPassword" placeholder='Confirme sua senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>

            {loading === true ? <button className='btn' type="submit">Aguarde...</button> : <button className='btn' type="submit">Cadastrar</button>}

            {error && <p className='error'>{error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}

export default Cadastro