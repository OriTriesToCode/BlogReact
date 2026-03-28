import { NavLink } from 'react-router'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-brand">🏛️ Mitos Griegos</span>
            <div className="navbar-links">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/contacto">Contacto</NavLink>
            </div>
        </nav>
    )
}

export default Navbar