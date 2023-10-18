const { request,response} = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarToken } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req = request, res = response) =>{
    try {
        const { correo, password} = req.body;
    
        const user = await User.findOne({correo});
        
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

        const token = await generarToken(user.uid);

        res.status(200).json({
            user,
            id_token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}


const googleLogin = async (req = request, res = response) => {

    const {id_token} = req.body;

    try {

        const {name, img, correo} = await googleVerify(id_token);

        let user = await User.findOne({correo});

        if(!user){
            const data = {
                name,
                correo,
                img,
                google:true,
                password:':P',
                role:'USER_ROLE'
            };

            user = new User(data);
            await user.save();
        }

        if(!user.estado){
            return res.status(401).json({
                msg:"El usuario esta bloqueado, hable con el administrador"
            })
        }

        const token = await generarToken(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleLogin
}