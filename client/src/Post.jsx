import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export default function Post() {
    const {id_post} = useParams();
    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});


    useEffect(() => {
        fetch('http://localhost:8000/posts/'+id_post)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }, [id_post]);

    useEffect(() => {
        fetch('http://localhost:8000/authors/'+post.id_author)
        .then((res) => res.json())
        .then((data) => setAuthor(data));
    }, [post.id_author]);

    return (
        <>
            {post.image && <img src={'../'+post.image} alt="Imagen"></img>}
            <h1> {post.title} </h1>
            <Link to={"/blog/author/"+ post.id_author}> 
                <h2> Escrito por: {author.name} {author.lastname} </h2>
            </Link>
            <h2>{post.date && post.date.split('T')[0]}</h2>
            <p>{post.text}</p>
        </>
    );
}