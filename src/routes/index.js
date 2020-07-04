/*
############################################
AQUI CREO TODAS MIS RUTAS PARA UTILIZAR EN EL
ARCHIVO DE SERVER; Y  ASI, ESTAS PUEDAN SER 
UTILIZADAS POR LOS SERVICIOS DEL FRONTEND
    - Fabian David Navarro Cano.
#########################################
*/

const express = require('express'); // creo e importacion el modulo o dependencia express, para una eficiencia de escritura en NodeJs y en sus procesos HTTP
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

module.exports = router;