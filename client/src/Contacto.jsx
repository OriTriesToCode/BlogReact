import './Contacto.css'
import { useState } from 'react'

function Contacto() {
    const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
    const [enviado, setEnviado] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Formulario:', form);
        setEnviado(true);
    }

    return (
        <div>
            <h2>Contacto</h2>
            <p>¿Tienes alguna pregunta? Escríbenos.</p>
        </div>
    )
}
  
export default Contacto