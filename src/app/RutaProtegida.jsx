import React from 'react'
import { Navigate } from 'react-router-dom'

    export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token')
    }

    const RutaProtegida = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />
    }

    export default RutaProtegida
