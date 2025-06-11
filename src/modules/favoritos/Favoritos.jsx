// src/modules/favoritos/Favoritos.jsx
import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import styles from './Favoritos.module.css'

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    API.get('favoritos/') // Ajusta la URL según tu backend
      .then(res => setFavoritos(res.data))
      .catch(() => setError('Error al cargar favoritos'))
  }, [])

  const handleEliminar = async (id) => {
    try {
      await API.delete(`favoritos/${id}/`)
      setFavoritos(favoritos.filter(f => f.id !== id))
    } catch {
      setError('Error al eliminar favorito')
    }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>

  if (favoritos.length === 0) return <p>No tienes productos favoritos aún.</p>

  return (
    <div className={styles.container}>
      <h2>Mis Favoritos</h2>
      <div className={styles.grid}>
        {favoritos.map(fav => (
          <div key={fav.id} className={styles.card}>
            <img
              src={`http://localhost:8000${fav.producto_detalle.imagen}`}
              alt={fav.producto_detalle.nombre}
              className={styles.img}
            />
            <h4>{fav.producto_detalle.nombre}</h4>
            <p>{fav.producto_detalle.descripcion}</p>
            <p><strong>${fav.producto_detalle.precio}</strong></p>
            <button onClick={() => handleEliminar(fav.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favoritos
