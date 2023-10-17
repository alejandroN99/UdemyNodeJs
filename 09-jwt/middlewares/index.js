const validarToken = require("./validar_token");
const validarCampos = require("./validar-campos");
const validarRoles = require("./validar-role");


module.exports = {
    ...validarCampos,
    ...validarRoles,
    ...validarToken
}