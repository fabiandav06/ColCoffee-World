const express = require('express');
const router = express.Router();

const Usuario = require('../models/task');


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
    const { id } = req.params;
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