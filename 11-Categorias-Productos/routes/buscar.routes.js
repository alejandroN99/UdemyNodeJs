const { Router } = require("express");
const { buscarController } = require("../controllers/buscar.controller");

const router = new Router();

router.get("/:coleccion/:termino", buscarController);

module.exports = router;
