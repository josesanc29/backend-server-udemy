var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
//------------------------------------------------
//Verificar el token
//------------------------------------------------
exports.verificaToken = function (req , res , next){
    var token = req.params.token;
    jwt.verify( token , SEED , ( err , decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errs: err
            });
        }
        req.usuario = decoded.usuario;
        next();
        
    });
}
// Fin verificar token
// exportamos el modulo

