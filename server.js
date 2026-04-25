const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
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

//definición de la carpeta donde se guardarán las imágenes al subir y el nombre que se les asignará
const storage = multer.diskStorage({
    destination: '../client/src/assets/uploads/',
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});
//creación del multer con los datos definidos en storage
const upload = multer({storage: storage});

const db = pgp(cn)

app.use(session({
    store: new pgSession({
        pgPromise: db,
    }),
    secret: 'hola',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10*60*1000, secure: false},
}));

const authenticateSession = (req, res, next) => {
    if (req.session.id_author) {
        next();
    } else {
        res.sendStatus(401);
    }
};

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
app.get('/authors/:id_author', authenticateSession, (req, res) => {
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

app.post('/login', upload.none(), (req, res) => {
    const {username, password} = req.body;

    db.oneOrNone("SELECT * FROM author WHERE username=$1", [username])
    .then((data) => {
        if (data != null){
            if(data.password == password) {
                req.session.id_author = data.id_author;
                req.session.save(function (err) {
                    if (err) return next(err)
                })
                res.send(req.session);
            } else {
                res.status(401).send('Invalid email/password');
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
    })
    .catch((error) => console.log('ERROR: ', error));
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Failed to destroy session');
        }
        res.send('Session destroyed');
    });
});

app.get('/session-info', (req, res) => {
    res.json(req.session);
});

app.listen(8000, () => {
    console.log('Servidor corriendo en el puerto 8000');
});

