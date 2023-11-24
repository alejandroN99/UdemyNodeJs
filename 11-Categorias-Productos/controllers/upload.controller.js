const { response } = require("express");
const path = require('path');
const fs = require('fs');
const { subirArchivo } = require("../helpers");
const { User, Producto } = require("../models");

const cloudinary = require('cloudinary').v2
          
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {
  try {
    //textos
    // const nombre = await subirArchivo(req.files, ['txt','md'], 'textos');
    const nombre = await subirArchivo(req.files);

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(404).json({ msg });
  }
};

// const actualizarArchivo = async (req, res = response) => {
//   const { coleccion, id } = req.params;

//   let modelo;

//   switch (coleccion) {
//     case "usuarios":
//       modelo = await User.findById(id);

//       if (!modelo) {
//         res.status(400).json({
//           msg: `No existe el usuario con id : ${id}`,
//         });
//       }
//       break;

//     case "productos":
//       modelo = await Producto.findById(id);

//       if (!modelo) {
//         res.status(400).json({
//           msg: `No existe el producto con id : ${id}`,
//         });
//       }
//       break;

//     default:
//       return res.status(500).json({
//         msg: "Se me olvidó validar esto",
//       });
//   }

//   if(modelo.img){
//     const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.img);

//     if(fs.existsSync(pathImagen)){
//       fs.unlinkSync(pathImagen);
//     }
//   }

//   const nombre = await subirArchivo(req.files,undefined,coleccion);
//   modelo.img = nombre;

//   await modelo.save();

//   res.json({
//     modelo
//   }) 
// };

const actualizarArchivoCloudinary = async (req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await User.findById(id);

      if (!modelo) {
        res.status(400).json({
          msg: `No existe el usuario con id : ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);

      if (!modelo) {
        res.status(400).json({
          msg: `No existe el producto con id : ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  if(modelo.img){
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');
      cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath} = req.files.archivo;
  const {secure_url}= await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;

  await modelo.save();

  res.json({
    modelo: modelo.img
  }) 
};


const mostrarArchivo = async (req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await User.findById(id);

      if (!modelo) {
        res.status(400).json({
          msg: `No existe el usuario con id : ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);

      if (!modelo) {
        res.status(400).json({
          msg: `No existe el producto con id : ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion, modelo.img);

    if(fs.existsSync(pathImagen)){
      return res.sendFile(pathImagen);
    }
  }

  const pahtNoImagen = path.join(__dirname,'../assets','no-image.jpg');
  return res.sendFile(pahtNoImagen);
};

module.exports = {
  cargarArchivo,
  actualizarArchivoCloudinary,
  mostrarArchivo
};
