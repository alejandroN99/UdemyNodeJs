const { Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { cargarArchivo, actualizarArchivoCloudinary, mostrarArchivo } = require("../controllers/upload.controller");
const { check } = require("express-validator");
const { coleccionesPermitidas } = require("../helpers");
const { validarArchivo } = require("../middlewares");

const router = new Router();

router.post('/',validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No es un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos']) ),
    validarCampos
], actualizarArchivoCloudinary);

router.get('/:coleccion/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos']) ),
    validarCampos
], mostrarArchivo);




module.exports = router;
