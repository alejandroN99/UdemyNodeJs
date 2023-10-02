const { crearArchivo } = require("./helpers/multiplicar");

const argv = require("yargs")
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .options("l", {
    alias: "listar",
    type: "boolean",
    default: false
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser numero";
    }

    return true;
  }).argv;

console.clear();

// const [, , arg3 = "base = 5"] = process.argv;
// const [, base = 5] = arg3.split("=");

console.log(argv);

crearArchivo(argv.b, argv.l)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
