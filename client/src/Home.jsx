import './Home.css'
import { Link } from 'react-router'
import { useState, useEffect } from 'react'
import Login from './Login'

function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/session-info", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(!!data.id_author);
            setChecking(false);
        })
        .catch(() => setChecking(false));
    }, []);

    if (checking) return null;

    if (!loggedIn) return <Login />;

    return (
        <div>
            <h2>Bienvenido a Mitos Griegos</h2>
            <p>Explora las historias y leyendas de la mitología griega.</p>
        </div>
    )
}

export default Home