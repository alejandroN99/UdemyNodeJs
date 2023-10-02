const fs = require("fs");
const colors = require("colors");

let salida = "";

const crearArchivo = async (base, listar,hasta) => {
  try {
    for (let i = 1; i <= hasta; i++) {
      let result = i * base;
      salida += `${i} x ${base} = ${result}\n`;
    }

    if(listar){
        console.log(colors.cyan(salida));
    }

    const file = fs.writeFileSync(`./salidas/tabla-${base}.txt`, salida);

    return `Tabla del ${base} creado!`;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  crearArchivo,
};
