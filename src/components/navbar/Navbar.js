import React from 'react'
import { useState} from 'react'
import { NavLink} from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { UserAuthentication } from '../../hooks/userAuthentication'
import { FaBars, FaWindowClose } from 'react-icons/fa'


// CSS
import styles from './Navbar.module.css'

const Navbar = () => {
    const {user} = useAuthValue()
    const { logout } = UserAuthentication()
    const [showMenu, setShowMenu] = useState(false)

    function menuIcon() {
        setShowMenu(!showMenu)
    }

   function closeMenu(){
    setShowMenu(false)
   }

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
        Illuminist <div className={styles.icon}>Blog</div>
        </NavLink>

        <span onClick={menuIcon}><FaBars/></span>
        
        
        <ul className={styles.links_list} style={showMenu === true ? {right: '0%'} : {right: '-60%'}}>
            <span onClick={menuIcon}><FaWindowClose/></span>
            <li>
                <NavLink to="/" end className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Home</NavLink> {/* O end serve para parar o bug da class active */}
            </li>

            {!user && (
                <>
                    <li>
                        <NavLink to="/login" end className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Entrar</NavLink> {/* O end serve para parar o bug da class active */}
                    </li>

                    <li>
                        <NavLink to="/register" end className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Cadastrar</NavLink> {/* O end serve para parar o bug da class active */}
                    </li>
                </>
            )}

            {user && (
                <>
                <li>
                    <NavLink to="/posts/create" end className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Novo post</NavLink> {/* O end serve para parar o bug da class active */}
                </li>

                <li>
                    <NavLink to="/dashboard" end className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Dashboard</NavLink> {/* O end serve para parar o bug da class active */}
                </li>
            </>
            )}

            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')} onClick={closeMenu}>Sobre</NavLink>
            </li>

            {user && (
                <li>
                    <div className={styles.name_display}>{user && user.displayName}</div>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar