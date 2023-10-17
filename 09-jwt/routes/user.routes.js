const { Router } = require("express");
const { check } = require("express-validator");

const { getUsers, deleteUsers,patchUsers,postUsers,putUsers } = require("../controllers/user.controllers");
const {RoleValidator, EmailValidator, UserIdValidator} = require("../helpers/db-validator");

const {
    validarToken,
    validarCampos,
    esAdminRole,
    tieneRol
} = require("../middlewares/index");

const router = new Router();

router.get('/', getUsers);

router.delete('/:id',[
    validarToken,
    // esAdminRole,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE','USER_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(UserIdValidator),
    validarCampos
], deleteUsers);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(UserIdValidator),
    check('role').custom(RoleValidator),
    validarCampos
], putUsers);

router.patch('/', patchUsers);

router.post('/',[
check('name','Es necesario un nombre').not().isEmpty(),
check('correo','Ese correo no es válido').isEmail(),
check('correo').custom(EmailValidator),
check('password','La contraseña tiene que tener mínimo 6 carácteres').isLength({min: 6 }),
// check('role','Ese role no esta permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('role').custom(RoleValidator),
validarCampos]
, postUsers);



module.exports = router;