import React, { useState } from 'react'
import API from '../../services/http-common'
import styles from './Comunidad.module.css'

const Comentarios = ({ comentarios, publicacionId }) => {
  const [listaComentarios, setListaComentarios] = useState(comentarios || [])
  const [nuevoTexto, setNuevoTexto] = useState('')
  const [error, setError] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [textoEditado, setTextoEditado] = useState('')

  const usuarioActual = localStorage.getItem('username') || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nuevoTexto.trim()) return
    if (!publicacionId) {
      setError('ID de publicación no definido')
      return
    }
    try {
      const res = await API.post(`community/comentarios/?publicacion=${publicacionId}`, {
        texto: nuevoTexto
      })
      setListaComentarios([...listaComentarios, res.data])
      setNuevoTexto('')
      setError('')
    } catch {
      setError('Error al enviar el comentario.')
    }
  }

  const iniciarEdicion = (comentario) => {
    setEditandoId(comentario.id)
    setTextoEditado(comentario.texto)
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setTextoEditado('')
  }

  const guardarEdicion = async (id) => {
    if (!textoEditado.trim()) return
    try {
      const res = await API.patch(`community/comentarios/${id}/`, { texto: textoEditado })
      const nuevosComentarios = listaComentarios.map(c => (c.id === id ? res.data : c))
      setListaComentarios(nuevosComentarios)
      cancelarEdicion()
    } catch {
      setError('Error al actualizar el comentario.')
    }
  }

  const eliminarComentario = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este comentario?')) return
    try {
      await API.delete(`community/comentarios/${id}/`)
      setListaComentarios(listaComentarios.filter(c => c.id !== id))
    } catch {
      setError('Error al eliminar el comentario.')
    }
  }

  return (
    <div className={styles.comentariosContainer}>
      <h5>Comentarios</h5>
      {listaComentarios.length === 0 && <p>No hay comentarios aún.</p>}

      {listaComentarios.map(c => (
  <div key={c.id} className={styles.comentario}>
    <p className={styles.usuario}><strong>{c.usuario_username}</strong> dijo:</p>

    {editandoId === c.id ? (
      <>
        <textarea
          value={textoEditado}
          onChange={(e) => setTextoEditado(e.target.value)}
          rows={3}
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <button onClick={() => guardarEdicion(c.id)} className={styles.iconBtn}>💾</button>
          <button onClick={cancelarEdicion} className={styles.iconBtn}>❌</button>
        </div>
      </>
    ) : (
      <>
        <p>{c.texto}</p>
        <p className={styles.fecha}>{new Date(c.fecha).toLocaleString()}</p>
        <div className={styles.actions}>
          <button onClick={() => iniciarEdicion(c)} className={styles.iconBtn} title="Editar">✏️</button>
          <button onClick={() => eliminarComentario(c.id)} className={styles.iconBtn} title="Eliminar">🗑️</button>
        </div>
      </>
    )}
  </div>
))}

      <form onSubmit={handleSubmit} className={styles.comentariosForm}>
        <textarea
          placeholder="Escribe tu comentario..."
          value={nuevoTexto}
          onChange={(e) => setNuevoTexto(e.target.value)}
          rows={2}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Comentarios
