const { request, response } = require("express");



const esAdminRole = (req = request, res = response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere verificar el role sin validar el token primero"
        })
    }

    const {role, name} = req.usuario;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} no es administrador`
        })
    }
    next();
}


const tieneRol = (...roles) =>{
    return (req = request, res = response, next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg:"Se quiere verificar el role sin validar el token primero"
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio require de los roles: ${roles}`
            })
        }

        next()
    }
}
module.exports = {
    esAdminRole,
    tieneRol
}