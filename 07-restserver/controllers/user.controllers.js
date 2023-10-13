const { request,response} = require("express");



const getUsers = (req = request, res = response) => {

    const {page = 0, limit = 0, name} = req.query;
   
    res.json({
        msg:"get api-controlador ok",
        page,
        limit,
        name
    })
};

const postUsers = (req = request, res = response) => {
    const {nombre, apellido} = req.body;
    res.json({
        msg:"post api-controlador ok",
        nombre,
        apellido
    })
};

const deleteUsers = (_req, res = response) => {
    res.json({
        msg:"delete api-controlador ok"
    })
};

const patchUsers = (_req, res = response) => {
    res.json({
        msg:"pach api-controlador ok"
    })
};

const putUsers = (req = request, res = response) => {

    const id = req.params.id
    res.json({
        msg:"put api-controlador ok",
        id
    })
};

module.exports = {
    getUsers,
    deleteUsers,
    patchUsers,
    postUsers,
    putUsers
}