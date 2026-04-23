import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Author() {
    const {id_author} = useParams();
    const [author, setAuthor] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/authors/'+id_author)
        .then((res) => res.json())
        .then((data) => setAuthor(data));
    }, [id_author]);

    return (
        <>
            {author.image && <img src={'../'+author.image} alt="Imagen"></img>}
            <h1> {author.name} {author.lastname}</h1>
            <h3> {author.date_of_birth} </h3>
            <h3> {author.phone_number} </h3>
            <h3>{author.email}</h3>
        </>
    );
}