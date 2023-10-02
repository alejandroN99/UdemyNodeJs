const fs = require("fs");

let salida = "";

const crearArchivo = async (base, listar) => {
  try {
    for (let i = 1; i <= 10; i++) {
      let result = i * base;
      salida += `${i} x ${base} = ${result}\n`;
    }

    if(listar){
        console.log(salida);
    }

    const file = fs.writeFileSync(`tabla-${base}.txt`, salida);

    return `Tabla del ${base} creado!`;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  crearArchivo,
};
