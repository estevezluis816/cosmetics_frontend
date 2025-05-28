import React, { useState } from 'react'
import API from '../../services/http-common'
import { useNavigate, Link } from 'react-router-dom'
import './auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    tipo_piel: '',
    preferencias: ''
  })

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    try {
      await API.post('usuarios/registro/', formData)
      setError('')
      navigate('/login')
    } catch (err) {
      setError('No se pudo registrar el usuario. Verifica los datos.')
    }
  }

  return (
    <div className="auth-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Apellidos" value={formData.last_name} onChange={handleChange} />

        <select name="tipo_piel" value={formData.tipo_piel} onChange={handleChange} required>
          <option value="">Selecciona tu tipo de piel</option>
          <option value="grasa">Grasa</option>
          <option value="seca">Seca</option>
          <option value="mixta">Mixta</option>
          <option value="sensible">Sensible</option>
          <option value="normal">Normal</option>
        </select>

        <select name="preferencias" value={formData.preferencias} onChange={handleChange}>
          <option value="">Preferencias (opcional)</option>
          <option value="vegano">Productos veganos</option>
          <option value="sin_fragancia">Sin fragancia</option>
          <option value="tono_frio">Tonos fríos</option>
          <option value="tono_calido">Tonos cálidos</option>
        </select>

        <button type="submit">Registrarse</button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}

export default Register
