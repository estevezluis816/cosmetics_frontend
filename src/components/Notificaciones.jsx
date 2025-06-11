    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import styles from './Notificaciones.module.css';

    const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotificaciones = async () => {
        try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/community/notificaciones/', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        setNotificaciones(res.data);
        } catch (err) {
        setError('Error al cargar las notificaciones');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotificaciones();

        // Opcional: recarga cada 60 segundos
        // const interval = setInterval(fetchNotificaciones, 60000);
        // return () => clearInterval(interval);
    }, []);

    const marcarComoLeida = async (id) => {
        try {
        const token = localStorage.getItem('token');
        await axios.patch(`/api/community/notificaciones/${id}/`, { leida: true }, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        setNotificaciones((prev) =>
            prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
        );
        } catch (err) {
        console.error('Error al marcar como leída', err);
        }
    };

    if (loading) return <p className={styles.loading}>Cargando notificaciones...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
        <h2>Notificaciones</h2>
        {notificaciones.length === 0 ? (
            <p>No tienes notificaciones.</p>
        ) : (
            notificaciones.map((n) => (
            <div
                key={n.id}
                className={`${styles.card} ${n.leida ? styles.leida : styles.noLeida}`}
            >
                <h4>
                {n.titulo}{' '}
                {n.tipo && <span className={styles.tipo}>({n.tipo})</span>}
                </h4>
                <p>{n.mensaje}</p>
                <small>{new Date(n.fecha).toLocaleString()}</small>
                {!n.leida && (
                <button onClick={() => marcarComoLeida(n.id)}>Marcar como leída</button>
                )}
            </div>
            ))
        )}
        </div>
    );
    };

    export default Notificaciones;
