import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

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
            <label>Usuario:</label>
            <input type="text" value={username} onChange={handleUsernameChange}></input>
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={handlePasswordChange}></input>
            <input type="submit" value="Entrar" onChange={handleSubmit} className="submit"></input>
        </div>
    )
}