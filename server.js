const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/hello', (req,res) => {
    res.json({message: "Hola"});
});

const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'Blog',
    user: 'postgres',
    password: 'OriYa',
    allowExitOnIdle: true
}

const db = pgp(cn)

/* GET all the posts */

app.get('/posts', (req, res) => {
    db.any('SELECT * FROM post')
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
});

/*GET a specific post */
app.get('/posts/:id_post', (req, res) => {
    db.one('SELECT * FROM post WHERE id_post=$1', [req.params.id_post])
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000');
});