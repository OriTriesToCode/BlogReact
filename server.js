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

//import multer
const multer = require('multer');
//definición de la carpeta donde se guardarán las imágenes al subir y el nombre que se les asignará
const storage = multer.diskStorage({
    destination: '../client/src/assets/uploads/',
    filename: function(req, file, cb){
        cb(null, file.originalmente)
    }
});
//creación del multer con los datos definidos en storage
const upload = multer({storage: storage});


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

/* GET all the authors */
app.get('/authors', (req, res) => {
    db.any('SELECT * FROM author')
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
});

/*GET a specific author */
app.get('/authors/:id_author', (req, res) => {
    db.one('SELECT * FROM author WHERE id_author=$1', [req.params.id_author])
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
})

app.post('/posts/new', upload.single('img'), function(req, res) {
    db.none("INSERT INTO post (title, img) VALUES($1, $2)", [req.body.title, req.file.originalname])
    .then(res.send({
        message: 'Post agredado correctamente'
    }))
    .catch((error) => console.log('ERROR: ', error));
});

app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000');
});