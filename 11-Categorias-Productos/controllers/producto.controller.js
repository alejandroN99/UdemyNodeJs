const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req, res= response) => {
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('user','name')
        .populate('categoria','name')
        .skip(Number(desde))
        .limit(Number(limit))
    ])
   
    res.json({
        total,
        productos
    })
}

const obtenerProducto = async (req, res= response) => {
    try {

        const {id} = req.params;

        const producto = await Producto.findById(id)
        .populate('user','name')
        .populate('categoria','name');

        res.status(200).json({
            producto
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}

const updateProducto = async (req, res= response) => {
    try {

        const {id }= req.params;
        const {estado,  user, ...data} = req.body;
        data.name = data.name.toUpperCase();

        const update= await Producto.findByIdAndUpdate(id,data, {new: true});

        if(update.estado === false){
            res.status(400).json({
                msg:`No existe la categoria ${nombre}`
            })
        }

        res.status(200).json({
            update
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}


const deleteProducto = async (req = request, res = response) => {

    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    
    res.json({
        productoBorrado
    })
};


const crearProducto = async (req, res = response) => {

        const {estado, user, ...data} = req.body;
        data.name = data.name.toUpperCase();
        
    
        const existProducto = await Producto.findOne({name: data.name});
    
        if(existProducto){
            res.status(400).json({
                msg:`El producto ${existProducto.name} ya existe`
            })
        }
        console.log(req.usuario._id)
        //Generar datos a guardar
        const producto = {
            ...data,
            name: data.name,
            user: req.usuario._id
            
        };
    
        const newProducto= new Producto(data);
    
        await newProducto.save();
    
        res.status(201).json({
            msg:"Producto creado correctamente",
            producto
        });
        
    
}



module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    deleteProducto,
    updateProducto
}