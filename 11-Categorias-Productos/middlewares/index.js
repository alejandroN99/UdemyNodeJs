const validarToken = require("./validar_token");
const validarCampos = require("./validar-campos");
const validarRoles = require("./validar-role");
const validarArchivo = require("./validar-archivo");


module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarToken,
    ...validarArchivo
}