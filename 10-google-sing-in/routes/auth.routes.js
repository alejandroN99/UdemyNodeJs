const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { login, googleLogin } = require("../controllers/auth.controller")

const router = new Router();

router.post('/login',[
 check('correo','El correo es obligatorio').isEmail(),
 check('password','La contraseña es obligatoria').not().isEmpty(),
 validarCampos   
], login);

router.post('/google',[
    check('id_token','El token es necesario').not().isEmpty(),
    validarCampos   
   ], googleLogin);

module.exports = router;