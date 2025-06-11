// src/routes/AppRoutes.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../modules/usuarios/Login'
import Register from '../modules/usuarios/Register'
import Perfil from '../modules/usuarios/Perfil'
import EditarPerfil from '../modules/usuarios/EditarPerfil'
import Productos from '../modules/productos/Productos'
import RutaProtegida from '../app/RutaProtegida'
import Layout from '../components/Layout'
import Comunidad from '../modules/comunidad/Comunidad'
import Favoritos from '../modules/favoritos/Favoritos'
import Carrito from '../modules/carrito/Carrito'
import AsistenteVirtual from '../modules/maquillaje/AsistenteVirtual'
import Notificaciones from '../components/Notificaciones' // 👈 Asegúrate de que esta ruta sea correcta
import App from '../App'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <RutaProtegida>
          <Layout>
            <App />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/perfil" element={
        <RutaProtegida>
          <Layout>
            <Perfil />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/perfil/editar" element={
        <RutaProtegida>
          <Layout>
            <EditarPerfil />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/productos" element={
        <RutaProtegida>
          <Layout>
            <Productos />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/comunidad" element={
        <RutaProtegida>
          <Layout>
            <Comunidad />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/favoritos" element={
        <RutaProtegida>
          <Layout>
            <Favoritos />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/carrito" element={
        <RutaProtegida>
          <Layout>
            <Carrito />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/maquillaje" element={
        <RutaProtegida>
          <Layout>
            <AsistenteVirtual />
          </Layout>
        </RutaProtegida>
      } />
      <Route path="/notificaciones" element={   // ✅ Aquí agregamos la nueva ruta
        <RutaProtegida>
          <Layout>
            <Notificaciones />
          </Layout>
        </RutaProtegida>
      } />
    </Routes>
  </Router>
)

export default AppRoutes
