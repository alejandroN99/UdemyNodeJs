const jwt = require("jsonwebtoken");
const {request, response} = require("express");
const User = require("../models/user");

const validarToken = async (req = request, res = response, next) => {
    const token = req.header('jw-token');

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }

    try {

        const payload = jwt.verify(token, process.env.SECRETKEY_JWT);
        console.log(payload);

        const usuario = await User.findById(payload._id);

        if(!usuario){
            return res.status(401).json({
                msg:"Token no válido"
            })
        };

        if(!usuario.estado){
            return res.status(401).json({
                msg:"Token no válido"
            })
        }

        req.usuario = usuario;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token no existe"
        })
    }
}

module.exports = {
    validarToken
}