import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'


const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/login')
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>🌿 Cosmética Natural</div>
      <div className={styles.links}>
        <Link className={styles.link} to="/">Inicio</Link>
        <Link className={styles.link} to="/cuidados">Cuidado de la piel</Link>
        <Link className={styles.link} to="/fragancias">Fragancias</Link>
        <Link className={styles.link} to="/novedades">Novedades</Link>
        <Link className={styles.link} to="/comunidad">Comunidad</Link>
        <Link className={styles.link} to="/perfil">Perfil</Link>
        <button className={styles.button} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar
