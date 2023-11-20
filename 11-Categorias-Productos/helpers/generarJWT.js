
const jwt = require("jsonwebtoken");


const generarToken = ( uid = '') => {
    return new Promise ((res, rej) => {
        const payload = {_id: uid};

        jwt.sign(payload, process.env.SECRETKEY_JWT,{
            expiresIn: '4h'
        } ,(err,token) => {
            if(err) {
                console.log(err);
                rej("El token no se ha podido generar")
            }else{
                res(token);
            }
        })
    })
}

module.exports = {
    generarToken
}