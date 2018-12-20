var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValido = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    mensaje: '{VALUE} no es un rol valido o permitido'
}

var usuarioSchema = new Schema({
    nombre : {type: String , required: [true , 'El campo nombre es obligatorio']},
    email : {type: String , unique: true , required: [true , 'El campo email es obligatorio']},
    password : {type: String , required: [true , 'El password es obligatorio']},
    img : {type: String , required: false},
    role: {type: String , required: true ,default: 'USER_ROLE'}

});

usuarioSchema.plugin( uniqueValidator , {mensaje: '{PATH} debe ser un email unico, no puede haber repetidos'}); 

module.exports = mongoose.model('Usuario' , usuarioSchema);