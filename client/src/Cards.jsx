export function CardList({entries, filteredText}) {
    const cards = entries.map(entry => 
        entry.title.includes(filteredText) && 
        <Card
        key={entry.id}
        id={entry.id} 
        title={entry.title} 
        img={entry.img} 
        date={entry.date}></Card>)
    return (
        <div className='main'>
        {cards}
        </div>
    )
}
  
export function Card({id, img, title, date}) {
    return (
        <div className='card'>
            <div className='image-container'>
                <img src={img} alt={title} />
            </div>
            <h2> {title} </h2>
            <p> {date} </p>
        </div>
    )
}