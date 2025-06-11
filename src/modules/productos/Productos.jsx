import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import styles from './Productos.module.css'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroPiel, setFiltroPiel] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    API.get('productos/')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err))

    API.get('categorias/')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al cargar categorías:', err))
  }, [])

  const handleToggleFavorito = async (producto) => {
    try {
      if (producto.es_favorito && producto.id_favorito) {
        await API.delete(`favoritos/${producto.id_favorito}/`)
      } else {
        const res = await API.post('favoritos/', { producto: producto.id })
        producto.id_favorito = res.data.id
      }

      const actualizados = productos.map(p =>
        p.id === producto.id
          ? {
              ...p,
              es_favorito: !p.es_favorito,
              id_favorito: p.es_favorito ? null : producto.id_favorito
            }
          : p
      )
      setProductos(actualizados)
    } catch (error) {
      console.error('Error al actualizar favorito:', error)
    }
  }

  const handleAgregarCarrito = async (productoId) => {
    try {
      await API.post('carrito/', { producto: productoId, cantidad: 1 })
      setMensaje('Producto agregado al carrito 🛒')
      setTimeout(() => setMensaje(''), 3000)
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
    }
  }

  const productosFiltrados = productos.filter(p =>
    (!filtroCategoria || p.categoria?.id === parseInt(filtroCategoria)) &&
    (!filtroPiel || p.tipo_piel?.toLowerCase().includes(filtroPiel.toLowerCase()))
  )

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Productos disponibles</h2>

      {mensaje && <p className={styles.success}>{mensaje}</p>}

      <div className={styles.filtros}>
        <select
          className={styles.select}
          value={filtroCategoria}
          onChange={e => setFiltroCategoria(e.target.value)}
        >
          <option value="" disabled hidden>Filtrar por categoría</option>
          <option value="">Todas las categorías</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tipo de piel (ej. mixta)"
          value={filtroPiel}
          onChange={e => setFiltroPiel(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.grid}>
        {productosFiltrados.map(producto => (
          <div key={producto.id} className={styles.card}>
            {producto.imagen && (
              <img
                src={`http://localhost:8000${producto.imagen}`}
                alt={producto.nombre}
                className={styles.img}
              />
            )}
            <h4>{producto.nombre}</h4>
            <p className={styles.text}>{producto.descripcion}</p>
            <p><strong>${producto.precio}</strong></p>
            <p className={styles.meta}>Piel: {producto.tipo_piel}</p>
            <p className={styles.meta}>Categoría: {producto.categoria?.nombre}</p>
            {producto.promedio_calificacion && (
              <p className={styles.meta}>⭐ {producto.promedio_calificacion} / 5</p>
            )}
            <div className={styles.actions}>
              <button
                className={styles.favBtn}
                onClick={() => handleToggleFavorito(producto)}
                title={producto.es_favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {producto.es_favorito ? '❤️' : '🤍'}
              </button>
              <button
                className={styles.cartBtn}
                onClick={() => handleAgregarCarrito(producto.id)}
                title="Agregar al carrito"
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos
