const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (files,extensionesValidas = ["jpg", "md", "jpeg", "png", "gif"], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;

        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];
      
        //Validar extensiones
        if (!extensionesValidas.includes(extension)) {
          return reject({
            msg: "La extensión tiene que ser " + extensionesValidas,
          });
        }
      
        const nombreFinal = uuidv4()+ "." + extension;
        const uploadPath = path.join(
          __dirname,
          "../uploads",
          carpeta,
          nombreFinal 
        );
      
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
          if (err) reject( err );
      
          resolve(nombreFinal);
        });  
    })
}

module.exports = {
    subirArchivo
}