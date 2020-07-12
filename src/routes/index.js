/*
############################################
AQUI CREO TODAS MIS RUTAS PARA UTILIZAR EN EL
ARCHIVO DE SERVER; Y  ASI, ESTAS PUEDAN SER 
UTILIZADAS POR LOS SERVICIOS DEL FRONTEND
    - Fabian David Navarro Cano.
#########################################
*/

const express = require('express'); // creo e importacion el modulo o dependencia express, para una eficiencia de escritura en NodeJs y en sus procesos HTTP
const jwt = require('jsonwebtoken'); // creo e importo mi dependecia para generar tokens por medio del JWT
const ms = require('ms'); // Creo e importo la dependencia para convertir milisegundos
const router = express.Router(); // creo un enrutador para mejorar mi servicios en las transferencias de metodos para los HTTP

const Usuario = require('../models/cofUser'); // Creo una variable, donde almaceno un objeto con mis cararacteriticas del Usuario en la DB.



router.get('/', async(req, res) => {
    const usuarios = await Usuario.find();
    res.render('index', {
        usuarios
    });
});

router.post('/add', async(req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.redirect('/');
});

router.get('/delete/:id', async(req, res) => {
    const { id } = req.params; // Captador de parametros a partir de una destructuracion lo cual facilita buscar el id en el objeto
    await Usuario.remove({ _id: id });
    res.redirect('/');
});


router.get('/edit/:id', async(req, res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.render('edit', {
        usuario
    });
});


router.post('/edit/:id', async(req, res) => {
    const { id } = req.params;
    await Usuario.update({ _id: id }, req.body);
    res.redirect('/');
});


router.get('/companies', async(req, res) => {
    res.render('companies');
});

router.get('/news', async(req, res) => {
    res.render('news');
});
// ========================= JWT =========================

router.post('/login', (req, res) => {
    const expiration = 60 * 60; // Tiempo de expiracion del Token.
    const TokUser = { // Usuario de prueba, para "quemar" mi funcionamiento de mis REST y asi ejecutar JWT (JsonWebToken)
        id: 1,
        nombre: 'Coffee Universe'
    }
    const Token = jwt.sign(TokUser, 'UN_FABIAN_SECRETO', { expiresIn: expiration }) //Encriptando por defecto en HS256 con expiracion segun la variable "expiration"
    res.json({
        auth: true,
        time: ` This token going to expire in ${ms(1000 * expiration, {long: true})}`, // utilizo la constante ms para ver el tiempo de expiracion
        Token
    });
});

router.get('/protected', authenticToken, (req, res) => {
    jwt.verify(req.Token, 'UN_FABIAN_SECRETO', (err, data) => { //Verificacion de mi token a partir de mi codigo publico
        if (err) {
            res.sendStatus(401).json({
                auth: false,
                message: "You don't have a Token to authentificate !!"
            });
        } else {
            data = {
                id: data.id,
                nombre: data.nombre,
                expiration: data.exp
            }
            res.json({
                text: 'Protected!!',
                data
            });
        };
    });
});

function authenticToken(req, res, next) { //Funcion para autentificar el token
    const autHeader = req.headers['authorization'] //Captador del token que se encuentra en las cabeceras de postman, por medio de la variable "authorization"
    if (typeof autHeader !== 'undefined') {
        const aut = autHeader.split(" "); // Creo arreglo de dos elementos, donde uno es la palabra "bearer" y la segunda mi token generado en el RESTapi Post
        const autToken = aut[1]; // Captador solo del token para despues hacer su verificacion
        req.Token = autToken;
        next();
    } else {
        res.sendStatus(401).json({ // Status Unauthorized !!
            message: "It's possible that you don't have a token or your token have been expired"
        });
    }

};

module.exports = router;