const argv = require("yargs")
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar"
  })
  .options("l", {
    alias: "listar",
    type: "boolean",
    default: false,
    describe: "Se lista por consola la tabla de multiplicar"
  })
  .options("h", {
    alias: "hasta",
    type: "number",
    default: 10,
    describe: "El numero hasta que tiene que mostrar la tabla"
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser numero";
    }

    return true;
  }).argv;

  module.exports = argv;