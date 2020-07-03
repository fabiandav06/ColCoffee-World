const mongoose = require('mongoose');


let Schema = mongoose.Schema;

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
    },
    status: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('usuarios', usuarioSchema);