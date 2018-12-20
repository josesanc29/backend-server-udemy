// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB',(err , resp ) => {
    if ( err ) throw err;
    console.log('Base de Datos en el puerto 27017: \x1b[36m%s\x1b[0m', 'online');
});

//Importar Rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


//Rutas
app.use('/', appRoutes);
app.use('/login', loginRoutes);
app.use('/usuario', usuarioRoutes);

// Escuchar peticiones 
app.listen(3000 ,() => {
    console.log('Servidor Express en el puerto 3000: \x1b[36m%s\x1b[0m', 'online');
});