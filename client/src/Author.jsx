import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function Author() {
    const {id_author} = useParams();
    const [author, setAuthor] = useState({});
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/authors/`+id_author,{
            method: "GET",
            credentials: "include"
        })
        .then((res) => {
            if(res.status == 401) {
                navigate('/login');
            }
            return res.json()})
        .then((data) => setAuthor(data))
        .catch((error) => console.log(error))
    }, [id_author, navigate]);

    return (
        <>
            {author.image && <img src={'../'+author.image} alt="Imagen"></img>}
            <h1> {author.name} {author.lastname}</h1>
            <h3> {author.date_of_birth} </h3>
            <h3> {author.phone_number} </h3>
            <h3> {author.email} </h3>
        </>
    );
}