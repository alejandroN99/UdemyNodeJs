const { request,response} = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarToken } = require("../helpers/generarJWT")


const login = async (req = request, res = response) =>{
    try {
        const { correo, password} = req.body;
    
        const user = await User.findOne({correo});
        console.log(user)
        
        //Existe correo
        if(!user){
            return res.status(400).json({
                msg: "El user/password no son correctos - correo"
            })
        }

        //Revisar estado
        if(!user.estado){
            return res.status(400).json({
                msg: "El user/password no son correctos - estado:false"
            });
        }
        
        //Combrobar contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "El user/password no son correctos - password"
            });
        }

        //JWT

        const token = await generarToken(user._id);

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login
}