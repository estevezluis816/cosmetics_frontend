import React from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const App = () => {
  const navigate = useNavigate()

  const handleIrAProductos = () => {
    navigate('/productos')
  }

  return (
    <div className="home-container">
      <h1 className="titulo">Bienvenido al sistema de cosméticos 💄</h1>
      <p className="subtitulo">
        Descubre tu belleza natural con nuestra línea de productos personalizados según tu tipo de piel y preferencias.
      </p>

      <button className="boton-ir" onClick={handleIrAProductos}>
        Ver productos
      </button>
    </div>
  )
}

export default App
