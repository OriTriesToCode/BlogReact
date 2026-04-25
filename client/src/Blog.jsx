import { useEffect, useState } from 'react'
import './Blog.css'
import { CardList } from './Cards';
import { Link } from 'react-router';

function Blog() {
    const[entries, setEntries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/posts")
          .then((res) => res.json())
          .then((posts) => setEntries(posts))
          .catch((err) => console.error("Error cargando posts:", err));
    }, []);

    const [filteredText, setFilteredText] = useState('');
  
    return (
      <>
        <h1>Articulos Recientes</h1>
        <div className='filter'>
          <h3>Buscar:</h3>
          <input 
            type="text" 
            value={filteredText} 
            onChange={(e) => setFilteredText(e.target.value)}
            placeholder="Buscar por título..."
            />
        </div>
        <CardList entries = {entries} filteredText={filteredText}></CardList>
        <Link to="/nuevo-post" className="crear-post-btn">Crear Post</Link>
      </>
    )
  }
  
  export default Blog