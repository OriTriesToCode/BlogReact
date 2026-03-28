import { useEffect, useState } from 'react'
import './Blog.css'
// import { entries } from './data'
import { CardList } from './Cards';

function Blog() {
    const[entries, setEntries] = useState([{id_post:0, title:"", date:"", image:"", text:"", id_author:0}]);

    useEffect(() => {
        fetch("http://localhost:8000/posts")
        .then((res) => res.json())
        .then((posts) => setEntries(posts));
    }, []);

    const [filteredText, setFilteredText] = useState('');
    function handleChange(e) {
      setFilteredText(e.target.value);
    }
  
    return (
      <>
        <h1>Articulos Recientes</h1>
        <div className='filter'>
          <h3>Buscar:</h3>
          <input type="text" value={filteredText} onChange={handleChange}></input>
        </div>
        <CardList entries = {entries} filteredText={filteredText}></CardList>
      </>
    )
  }
  
  export default Blog