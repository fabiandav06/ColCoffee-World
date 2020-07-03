/*
#########################################
AQUI VOY A CREAR MI PRIMER SERVIDOR, PARA
CONTROLAR ADECUAMENTE TODA MI PAGINA.
    - Fabian David Navarro Cano.
#########################################
*/

const path = require('path'); //modulo utilizado para manejar diferentes sistemas operativos (Linux, windows,...)
const express = require('express'); //Esta dependencia la utilizo para conectarme con el server
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express(); //Aqui inicializo mi funcion de la depens


// ==== Conecting to Data Base ====
mongoose.connect('mongodb://localhost:27017/ColCoffee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err;
    console.log('The data base is ONLINE');
});


// ==== importing Routes ==== 
const indexRoutes = require('./routes/index'); // enlazador de las routes


// ==== Settings ==== 
const port = process.env.PORT || 3000; //Conexion al puerto del servido publico o local
app.set('views', path.join(__dirname, 'views')); // Camino creado para las vistas del frontend
app.set('view engine', 'ejs'); // Este es mi motor de vistas, para una mejor visualizacion de objetos

// ==== Midleware (funciones antes de las routes) ==== 
app.use(morgan('dev')); // medidor de velocidad de respuesta y peticiones GET al server
app.use(express.urlencoded({ extended: false })); //enlazador de palabras que son enviadas desde el server

// ==== Routes ==== 
app.use('/', indexRoutes);


// ==== Starting the server. (Esto lo utilizo para hacer calls al server) ==== 
app.listen(port, () => {
    try {
        console.log(`We are listening on the ${port}`);
    } catch (err) {
        console.log(`Please, try with the port 3000`, err);
    }
})