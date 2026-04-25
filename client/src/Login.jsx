// client/src/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSubmit() {
        const formInfo = new FormData();
        formInfo.append("username", username);
        formInfo.append("password", password);

        fetch("http://localhost:8000/login", {
            method: "POST",
            credentials: "include",
            body: formInfo,
        })
        .then((res) => {
            if (!res.ok) throw new Error('Credenciales inválidas');
            return res.json();
        })
        .then((data) => navigate('/blog/author/' + data.id_author))
        .catch(() => setError('Usuario o contraseña incorrectos'));
    }

    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p style={{color: 'tomato'}}>{error}</p>}
            <label>Usuario:</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input type="submit" value="Entrar" onClick={handleSubmit} />
        </div>
    );
}