// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err , resp ) => {
    if ( err ) throw err;
    console.log('Base de Datos en el puerto 27017: \x1b[36m%s\x1b[0m', 'online');
});

//Rutas
app.get('/', (req , res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada con exito'
    });
});


// Escuchar peticiones 
app.listen(3000 ,() => {
    console.log('Servidor Express en el puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});