const { request,response} = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");



const getUsers = async (req = request, res = response) => {

    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true}

    // const usuarios = await User.find()
    //     .skip(Number(desde))
    //     .limit(Number(limit));

    // const total = await User.countDocuments();

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limit))
    ])
   
    res.json({
        total,
        usuarios
    })
};

const postUsers = async (req = request, res = response) => {
    const {name,correo,password,role}= req.body;

    const user = new User({name,correo,password,role});

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    user.password = hash;

    await user.save();

    res.json({
        user
    });
};

const deleteUsers = async (req = request, res = response) => {

    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {estado: false});
    
    
    res.json({
        user
    })
};

const patchUsers = (_req, res = response) => {
    res.json({
        msg:"pach api-controlador ok"
    })
};

const putUsers = async (req = request, res = response) => {

    const {id} = req.params

    const {_id, password, google,correo, ...resto} = req.body;

    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    };

    const usuario = await User.findByIdAndUpdate(id, resto)

    res.json(usuario)
};

module.exports = {
    getUsers,
    deleteUsers,
    patchUsers,
    postUsers,
    putUsers
}