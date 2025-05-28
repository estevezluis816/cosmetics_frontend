import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import { useNavigate } from 'react-router-dom'
import styles from './EditarPerfil.module.css'

const EditarPerfil = () => {
  const navigate = useNavigate()
  const [perfil, setPerfil] = useState({
    first_name: '',
    last_name: '',
    tipo_piel: '',
    preferencias: ''
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('usuarios/perfil/')
      .then(res => setPerfil(res.data))
      .catch(() => setError('No se pudo cargar el perfil'))
  }, [])

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.put('usuarios/perfil/', perfil)
      setMensaje('Perfil actualizado correctamente')
      setError('')
      setTimeout(() => navigate('/perfil'), 1500)
    } catch (err) {
      setError('Error al actualizar el perfil')
      setMensaje('')
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="first_name"
          value={perfil.first_name}
          onChange={handleChange}
          placeholder="Nombre"
          className={styles.input}
        />
        <input
          type="text"
          name="last_name"
          value={perfil.last_name}
          onChange={handleChange}
          placeholder="Apellidos"
          className={styles.input}
        />
        <input
          type="text"
          name="tipo_piel"
          value={perfil.tipo_piel}
          onChange={handleChange}
          placeholder="Tipo de piel"
          className={styles.input}
        />
        <input
          type="text"
          name="preferencias"
          value={perfil.preferencias}
          onChange={handleChange}
          placeholder="Preferencias"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Guardar cambios
        </button>
        {mensaje && <p className={styles.success}>{mensaje}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}

export default EditarPerfil
