var express = require('express');
var bcrytp = require('bcrytp');
var jwt = require('jsonwebtoken');
var app = express();
var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;

///--------------------------------
// Metodo post del envio del login
///--------------------------------
app.post('/' , (req , res ) =>{

    var body = req.body;

    Usuario.findOne({email: body.email} , (err , usuarioBD)=>{

        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Se ha producido un error en bd',
                err: err
            });

        }

        if (!usuarioBD){
            return res.status(400).json({
                ok:false,
                mensaje: 'No existe un usuario con este email: '+email+' .',
                err: err
            });
        }

        if (!bcrytp.compareSync(body.password , usuarioBD.password)){

            return res.status(400).json({
                ok:false,
                mensaje: 'No existe un usuario con esta contraseña : '+password+' .',
                err: err
            });
        }

        //Creamos el Token!!

        var token = jwt.sign({usuario: usuarioBD}, SEED ,{expiresIn: 14400}); //token expira en 4 horas
    
        return res.status(200).json({
            ok: true,
            mensaje: 'Login correcto!',
            id: usuarioBD.id,
            token: token,
            usuario: usuarioBD
        });
    
    });

});


module.exports = app;