/*
############################################
AQUI CREO MI OBJETO DEL USARIO, MEDIANTE
MONGOOSE PARA PODER UTILIZARLO EN MIS RUTAS
Y ASI EJECUTARLO EN EL SERVER.
    - Fabian David Navarro Cano.
#########################################
*/

const mongoose = require('mongoose'); //creo e importo la dependencia o modulo mongoose, para enlazarlo con MongoDB


let Schema = mongoose.Schema; //Creacion de esquema (objeto) para la iniciacion del modulo mongoose

const usuarioSchema = new Schema({
    company: {
        type: String,
        required: [true, 'The name of the company is important.']
    },
    drink: {
        type: String,
        required: [false, 'The name of the drink coffee is important.']
    },
    evaluation: {
        type: String,
        required: [true, 'The evaluation of the drink/company is important.']
    }
});


module.exports = mongoose.model('usuarios', usuarioSchema);