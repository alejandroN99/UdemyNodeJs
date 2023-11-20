const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken, esAdminRole } = require("../middlewares");
const {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  deleteCategoria,
  updateCategoria,
} = require("../controllers/categorias.controller");
const { CategoriaValidator } = require("../helpers/db-validator");

const router = new Router();

router.post(
  "/",
  [
    validarToken,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(CategoriaValidator),
    validarCampos,
  ],
  obtenerCategoria
);

router.put(
  "/:id",
  [
    validarToken,
    check("name", "El nombre es obligatrio").not().isEmpty(),
    check("id").custom(CategoriaValidator),
    validarCampos,
  ],
  updateCategoria
);

router.delete(
  "/:id",
  [
    validarToken,
    esAdminRole,
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(CategoriaValidator),
    validarCampos,
  ],
  deleteCategoria
);

module.exports = router;
