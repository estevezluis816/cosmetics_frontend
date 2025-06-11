// src/modules/carrito/Carrito.jsx
import React, { useEffect, useState } from 'react'
import API from '../../services/http-common'
import styles from './Carrito.module.css'

const Carrito = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    cargarCarrito()
  }, [])

  const cargarCarrito = () => {
    API.get('carrito/')
      .then(res => {
        setItems(res.data)
        calcularTotal(res.data)
      })
      .catch(() => setError('Error al cargar el carrito'))
  }

  const calcularTotal = (items) => {
    const suma = items.reduce((acc, item) => acc + (item.producto_detalle.precio * item.cantidad), 0)
    setTotal(suma)
  }

  const actualizarCantidad = async (id, cantidad) => {
    if (cantidad < 1) return
    try {
      await API.patch(`carrito/${id}/`, { cantidad })
      cargarCarrito()
    } catch {
      setError('Error al actualizar cantidad')
    }
  }

  const eliminarItem = async (id) => {
    try {
      await API.delete(`carrito/${id}/`)
      cargarCarrito()
    } catch {
      setError('Error al eliminar item')
    }
  }

  const confirmarPedido = async () => {
    try {
      await API.post('pedidos/')
      alert('Pedido confirmado exitosamente')
      cargarCarrito()
    } catch {
      setError('Error al confirmar pedido')
    }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (items.length === 0) return <p>El carrito está vacío.</p>

  return (
    <div className={styles.container}>
      <h2>Carrito de Compras</h2>

      {items.map(item => (
        <div key={item.id} className={styles.card}>
          <img
            src={`http://localhost:8000${item.producto_detalle.imagen}`}
            alt={item.producto_detalle.nombre}
            className={styles.img}
          />
          <div className={styles.info}>
            <h4>{item.producto_detalle.nombre}</h4>
            <p>Precio unitario: ${item.producto_detalle.precio}</p>
            <p>
              Cantidad:
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={e => actualizarCantidad(item.id, parseInt(e.target.value))}
                className={styles.inputCantidad}
              />
            </p>
            <button onClick={() => eliminarItem(item.id)} className={styles.btnEliminar}>Eliminar</button>
          </div>
        </div>
      ))}

      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={confirmarPedido} className={styles.btnConfirmar}>Confirmar Pedido</button>
    </div>
  )
}

export default Carrito
