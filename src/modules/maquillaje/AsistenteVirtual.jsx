// src/modules/maquillaje/AsistenteVirtual.jsx
import React, { useState, useEffect } from 'react'
import API from '../../services/http-common'
import styles from './AsistenteVirtual.module.css'

const AsistenteVirtual = () => {
  const [productos, setProductos] = useState([])
  const [seleccionados, setSeleccionados] = useState([])
  const [imagen, setImagen] = useState(null)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    API.get('productos/')
      .then(res => setProductos(res.data))
      .catch(() => setError('Error cargando productos'))
  }, [])

  const handleArchivo = e => {
    setImagen(e.target.files[0])
  }

  const toggleProducto = id => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!imagen) {
      setError('Debe subir una imagen')
      return
    }
    if (seleccionados.length === 0) {
      setError('Debe seleccionar al menos un producto')
      return
    }
    const formData = new FormData()
    formData.append('imagen_original', imagen)
    seleccionados.forEach(id => formData.append('productos', id))

    try {
      await API.post('maquillaje/simulaciones/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setMensaje('Simulación guardada con éxito')
      setError('')
      setImagen(null)
      setSeleccionados([])
    } catch {
      setError('Error al guardar simulación')
      setMensaje('')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Asistente Virtual de Maquillaje</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Sube una foto de tu rostro:
          <input type="file" accept="image/*" onChange={handleArchivo} />
        </label>

        <div>
          <h3>Selecciona los productos para simular:</h3>
          {productos.map(p => (
            <label key={p.id} style={{ display: 'block', marginBottom: '0.25rem' }}>
              <input
                type="checkbox"
                checked={seleccionados.includes(p.id)}
                onChange={() => toggleProducto(p.id)}
              />
              {p.nombre}
            </label>
          ))}
        </div>

        <button type="submit">Simular maquillaje</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
    </div>
  )
}

export default AsistenteVirtual
