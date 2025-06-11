import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import Comentarios from './Comentarios'
import styles from './Comunidad.module.css'

const Comunidad = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const [nuevoContenido, setNuevoContenido] = useState('')
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [error, setError] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [tituloEditado, setTituloEditado] = useState('')
  const [contenidoEditado, setContenidoEditado] = useState('')

  const usuarioActual = (localStorage.getItem('username') || '').toLowerCase()

  useEffect(() => {
    cargarPublicaciones()
  }, [])

  const cargarPublicaciones = () => {
    API.get('community/publicaciones/')
      .then(res => {
        setPublicaciones(res.data)
      })
      .catch(() => setError('Error al cargar publicaciones.'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post('community/publicaciones/', {
        titulo: nuevoTitulo,
        contenido: nuevoContenido
      })
      setNuevoContenido('')
      setNuevoTitulo('')
      setError('')
      cargarPublicaciones()
    } catch {
      setError('Error al publicar contenido.')
    }
  }

  const iniciarEdicion = (pub) => {
    setEditandoId(pub.id)
    setTituloEditado(pub.titulo)
    setContenidoEditado(pub.contenido)
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setTituloEditado('')
    setContenidoEditado('')
  }

  const guardarEdicion = async (id) => {
    if (!tituloEditado.trim() || !contenidoEditado.trim()) return
    try {
      await API.patch(`community/publicaciones/${id}/`, {
        titulo: tituloEditado,
        contenido: contenidoEditado
      })
      cancelarEdicion()
      cargarPublicaciones()
    } catch {
      setError('Error al actualizar la publicación.')
    }
  }

  const eliminarPublicacion = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta publicación?')) return
    try {
      await API.delete(`community/publicaciones/${id}/`)
      cargarPublicaciones()
    } catch {
      setError('Error al eliminar la publicación.')
    }
  }

  return (
    <div className={styles.comunidadContainer}>
      <h2 className={styles.titulo}>🌼 Comunidad de Belleza Natural</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Título de la publicación"
          value={nuevoTitulo}
          onChange={e => setNuevoTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Comparte tu experiencia o consejo..."
          value={nuevoContenido}
          onChange={e => setNuevoContenido(e.target.value)}
          required
          rows={3}
        />
        <button type="submit">Publicar</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>

      <div className={styles.publicaciones}>
        {publicaciones.length === 0 ? (
          <p>No hay publicaciones aún.</p>
        ) : (
          publicaciones.map(pub => (
            <div key={pub.id} className={styles.card}>
              <p className={styles.autor}><strong>{pub.usuario_username}</strong> compartió:</p>

              {editandoId === pub.id ? (
                <>
                  <input
                    type="text"
                    value={tituloEditado}
                    onChange={(e) => setTituloEditado(e.target.value)}
                    required
                  />
                  <textarea
                    value={contenidoEditado}
                    onChange={(e) => setContenidoEditado(e.target.value)}
                    rows={4}
                    required
                  />
                  <div className={styles.botonesEdicion}>
                    <button onClick={() => guardarEdicion(pub.id)}>💾</button>
                    <button onClick={cancelarEdicion}>❌</button>
                  </div>
                </>
              ) : (
                <>
                  <h4>{pub.titulo}</h4>
                  <p className={styles.contenido}>{pub.contenido}</p>
                </>
              )}

              <p className={styles.fecha}>{new Date(pub.fecha).toLocaleString()}</p>

              {(pub.usuario_username?.toLowerCase() === usuarioActual && editandoId !== pub.id) && (
                <div className={styles.iconos}>
                  <button
                    onClick={() => iniciarEdicion(pub)}
                    title="Editar publicación"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarPublicacion(pub.id)}
                    title="Eliminar publicación"
                  >
                    🗑️
                  </button>
                </div>
              )}

              <Comentarios comentarios={pub.comentarios} publicacionId={pub.id} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Comunidad
