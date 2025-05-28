import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import { useNavigate } from 'react-router-dom'
import styles from './Perfil.module.css'

const Perfil = () => {
  const [perfil, setPerfil] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    API.get('usuarios/perfil/')
      .then(res => setPerfil(res.data))
      .catch(() => setError('No se pudo cargar el perfil'))
  }, [])

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
  }

  if (!perfil) {
    return <p style={{ textAlign: 'center' }}>Cargando perfil...</p>
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mi Perfil</h2>
      <p className={styles.item}>
        <span className={styles.label}>Usuario:</span> {perfil.username}
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Nombre:</span> {perfil.first_name}
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Apellidos:</span> {perfil.last_name}
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Tipo de piel:</span> {perfil.tipo_piel}
      </p>
      <p className={styles.item}>
        <span className={styles.label}>Preferencias:</span> {perfil.preferencias}
      </p>
      <button onClick={() => navigate('/perfil/editar')} className={styles.editButton}>
        Editar perfil
      </button>
    </div>
  )
}

export default Perfil
