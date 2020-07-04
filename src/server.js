/*
#########################################
AQUI VOY A CREAR MI PRIMER SERVIDOR, PARA
CONTROLAR ADECUAMENTE TODA MI PAGINA.
    - Fabian David Navarro Cano.
#########################################
*/

const path = require('path'); //modulo utilizado para manejar diferentes sistemas operativos (Linux, windows,...) proveniente de "node_modules" de NodeJS
const express = require('express'); //Esta dependencia lo utilizo para conectarme de una manera eficiente y funcional al server de NodeJS
const morgan = require('morgan'); //Este es una dependencia o modulo que utilizo para verificar los request en tiempo de ejecucion en el server
const mongoose = require('mongoose'); // Este es otra dependencia que utilizo para enlazar y manipular mi base de datos MongoDB con mi server

const app = express(); //Aqui inicializo mi dependencia express, para utilizar todas sus funciones y ser eficiente en el desarrollo


// ==== Conecting to Data Base ====
mongoose.connect('mongodb://localhost:27017/ColCoffee', { //Inicializo mi DB en el puerto local de MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    if (err) throw err;
    console.log('The data base is ONLINE');
});


// ==== importing Routes ==== 
const indexRoutes = require('./routes/index'); // cargador de las routes para mi navegacion y utilizacion 


// ==== Settings ==== 
const port = process.env.PORT || 3000; //Cargador de la conexion al puerto del servido publico o local
app.set('views', path.join(__dirname, 'views')); // Camino o enlace por facilidad, que ayuda a potimzar las vistas al frontend
app.set('view engine', 'ejs'); // Este es mi motor de vistas, para una mejor visualizacion de los objetos en el frontend

// ==== Midleware (funciones antes de las routes) ==== 
app.use(morgan('dev')); // medidor de velocidad de mis request's y las peticiones GET al server
app.use(express.urlencoded({ extended: false })); //enlazador de palabras que son enviadas desde el server para captarlas de manera segura

// ==== Routes ==== 
app.use('/', indexRoutes); //Realiazador u ejecucion de mi constante de routes


// ==== Starting the server. (Esto lo utilizo para hacer calls de conexion al server) ==== 
app.listen(port, () => {
    try {
        console.log(`We are listening on the ${port}`);
    } catch (err) {
        console.log(`Please, try with the port 3000`, err);
    }
})