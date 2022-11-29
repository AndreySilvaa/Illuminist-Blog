import React from 'react'
import { useState } from 'react'
import { UserAuthentication } from '../../hooks/userAuthentication'

// CSS
import styles from './Login.module.css'



const Login = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const {loading, error, login} = UserAuthentication()


  const handleForm = (e) => {
      e.preventDefault()
    
      login(email, password)
     
  }
  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para poder utilizar o sistema</p>
        <form onSubmit={handleForm} className={styles.form}>
            <label htmlFor="email">
                <span>E-mail:</span>
                <input type="email" name="email" id="email" placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>

            <label htmlFor="password">
                <span>Senha:</span>
                <input type="password" name="password" id="password" placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>

            {loading === true ? <button type="submit" className='btn'>Aguarde...</button> : <button className='btn' type="submit">Entrar</button>}

            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login