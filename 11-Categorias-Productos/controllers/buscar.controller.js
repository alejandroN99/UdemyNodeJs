const { response } = require("express");
const { User, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["user", "categoria", "producto", "role"];

const buscarUsuarios = async (termino, res = response) => {

  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const user = await User.findById(termino);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const users = await User.find({
    $or: [{ name: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.status(200).json({
    results: users
  });
};

const buscarCategorias = async (termino = '', res = response) => {

    const isMongoId = ObjectId.isValid(termino);
  
    if (isMongoId) {
      const categoria = await Categoria.findById(termino);
      return res.json({
        results: categoria ? [categoria] : [],
      });
    }
  
    const regex = new RegExp(termino, "i");
    const categorias = await Categoria.find({name: regex, estado:true});
  
    res.status(200).json({
      results: categorias
    });
  };

  const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ name: regex, estado: true })
                            .populate('categoria','nombre')

    res.json({
        results: productos
    });

}

const buscarController = ( req, res = response ) => {
    
    const { coleccion, termino  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'user':
            buscarUsuarios(termino, res);
        break;
        case 'categoria':
            buscarCategorias(termino, res);
        break;
        case 'producto':
            buscarProductos(termino, res);
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}


module.exports = {
  buscarController,
};
