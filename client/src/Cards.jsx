export function CardList({entries, filteredText}) {
    const cards = entries
    .filter(entry => entry.title && entry.title.toLowerCase().includes(filteredText.toLowerCase()))
    .map(entry => 
        <Card
            key={entry.id_post}
            id={entry.id_post} 
            title={entry.title} 
            img={entry.image} 
            date={entry.date}
        />
    )
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