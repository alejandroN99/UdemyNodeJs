

const dbValidator = require("./db-validator");
const generarJwt = require("./generarJWT");
const googleVerify = require("./google-verify");
const subirArchivo = require("./subir-archivo");

module.exports = {
    ...dbValidator,
    ...generarJwt ,
    ...googleVerify,
    ...subirArchivo
}