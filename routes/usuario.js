var express = require('express');
var bcrypt = require ('bcrypt');
var app = express();
var jwt = require('jsonwebtoken');
var Usuario = require('../models/usuario');
var mdAuth = require('../middelwares/authentication')



//------------------------------------------------
//Obtener todos los usuarios
//------------------------------------------------

app.get('/', (req , res, next) => {
    Usuario.find({ } , 'nombre email img role').exec( ( err , usuarios ) => {
        if( err ){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando datos de usuarios',
                errs : err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Get de usuarios',
            usuarios: usuarios
        });

    });
    
});

//Fin obtener todos los usuarios



//------------------------------------------------
//Crear un  usuario
//------------------------------------------------
app.post('/' , mdAuth.verificaToken, (req, res)=>{

    var body = req.body;
    var usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        password : bcrypt.hash( body.password , 10),
        img : body.img,
        role : body.role
    });

    usuario.save( ( err , usuarioCreado ) => {

        if(err){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear un usuario',
                errs : err
            });

        }

        res.status(201).json({
            ok: true,
            mensaje: 'Se creo el usuario, OKY',
            usuario: usuarioCreado,
            tokenUsuario: req.usuario
        });
    });

    
});
//Fin crear usuario

//------------------------------------------------
//Actualizar un  usuario por su id
//------------------------------------------------

app.put('/:id', mdAuth.verificaToken , ( req , res ) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById( id , ( err , usuario) =>{

        if( err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar un usuario',
                errs : err
            }); 
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al buscar el usuario, el usuario con '+ id + ' no existe',
                errs : {mensaje:'No existe el usuario con ese id'}
            });  
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save(( err , usuarioGuardado) =>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    err: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Usuario actualizado OK',
                usuario: usuarioGuardado,
                tokenUsuario: req.usuario
            });
        });


    });
});

//Fin actualizar usuario

//------------------------------------------------
//Borrar un  usuario por su id
//------------------------------------------------

app.delete('/:id',mdAuth.verificaToken, (req , res)=>{
    var id = req.params.id;

    Usuario.findByIdAndRemove(id , (err, usuarioBorrado)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar un usuario',
                errs : err
            }); 
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario borrado OK',
            usuario: usuarioBorrado,
            tokenUsuario: req.usuario
        });
    });
});
//exportar usuario module.
module.exports = app;