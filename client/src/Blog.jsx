import { useState } from 'react'
import './App.css'
import { entries } from './data'
import { CardList } from './Cards';

function Blog() {
    const [filteredText, setFilteredText] = useState('');
    function handleChange(e) {
      setFilteredText(e.target.value);
    }
  
    return (
      <>
        <h1>Mitos Griegos</h1>
        <div className='filter'>
          <h3>Buscar:</h3>
          <input type="text" value={filteredText} onChange={handleChange}></input>
        </div>
        <CardList entries = {entries} filteredText={filteredText}></CardList>
      </>
    )
  }
  
  export default Blog