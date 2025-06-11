    // src/components/NotificacionesBell.jsx
    import React, { useEffect, useState } from 'react'
    import { FaBell } from 'react-icons/fa'  // Necesitas instalar react-icons: npm i react-icons
    import styles from './NotificacionesBell.module.css'

    const NotificacionesBell = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // Aquí deberías llamar a la API para obtener notificaciones no leídas
        // Ejemplo:
        fetch('/api/community/notificaciones/?leida=false', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        })
        .then(res => res.json())
        .then(data => {
            setCount(data.length)
        })
        .catch(err => {
            console.error('Error al cargar notificaciones', err)
        })
    }, [])

    return (
        <div className={styles.bellContainer} title="Notificaciones">
        <FaBell size={20} />
        {count > 0 && <span className={styles.countBadge}>{count}</span>}
        </div>
    )
    }

    export default NotificacionesBell
