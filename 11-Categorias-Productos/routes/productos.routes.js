const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarToken, esAdminRole } = require("../middlewares");
const {
    crearProducto,
  obtenerProducto,
  obtenerProductos,
  deleteProducto,
  updateProducto,
  
} = require("../controllers/producto.controller");
const { ProductoValidator, CategoriaValidator } = require("../helpers/db-validator");

const router = new Router();

router.post(
  "/",
  [
    validarToken,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(CategoriaValidator),
    validarCampos,
  ],
  crearProducto
);

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(ProductoValidator),
    validarCampos,
  ],
  obtenerProducto
);

router.put(
  "/:id",
  [
    validarToken,
    check("name", "El nombre es obligatrio").not().isEmpty(),
    check("id").custom(ProductoValidator),
    validarCampos,
  ],
  updateProducto
);

router.delete(
  "/:id",
  [
    validarToken,
    esAdminRole,
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(ProductoValidator),
    validarCampos,
  ],
  deleteProducto
);

module.exports = router;
