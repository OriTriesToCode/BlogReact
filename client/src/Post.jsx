import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {
    const {id_post} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/posts/'+id_post)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }, [id_post]);

    return (
        <>
            {post.image && <img src={'../'+post.image} alt="Imagen"></img>}
            <h1> {post.title} </h1>
            <Link to={"/blog/"+id_author}> 
                <h2> Escrito por: {post.id_author} </h2>
            </Link>
            <h2> {post.date} </h2>
            <p>{post.text}</p>
        </>
    );
}