import { useEffect, useState } from 'react'
import './Blog.css'
import { CardList } from './Cards';

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
      </>
    )
  }
  
  export default Blog