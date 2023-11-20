const { response, request } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias = async (req, res= response) => {
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('user','name')
        .skip(Number(desde))
        .limit(Number(limit))
    ])
   
    res.json({
        total,
        categorias
    })
}

const obtenerCategoria = async (req, res= response) => {
    try {

        const {id} = req.params;

        const categoria = await Categoria.findById(id)
        .populate('user','name');

        res.status(200).json({
            categoria
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}

const updateCategoria = async (req, res= response) => {
    try {

        const {id }= req.params;
        const {estado,  user, ...data} = req.body;
        data.name = req.body.name.toUpperCase();

        const update= await Categoria.findByIdAndUpdate(id,data, {new: true});

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


const deleteCategoria = async (req = request, res = response) => {

    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    
    
    res.json({
        categoriaBorrada
    })
};


const crearCategoria = async (req = request, res = response) => {

    try {
        const name = req.body.name.toUpperCase();
    
        const existCategoria = await Categoria.findOne({name});
    
        if(existCategoria){
            res.status(400).json({
                msg:`La categoría ${existCategoria.name} ya existe`
            })
        }
        
        //Generar datos a guardar
        const data = {
            name,
            user: req.usuario._id
        };
    
        const categoria = new Categoria(data);
    
        await categoria.save();
    
        res.status(201).json({
            msg:"Categoría creada correctamente",
            categoria
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
}

module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    deleteCategoria,
    updateCategoria
}