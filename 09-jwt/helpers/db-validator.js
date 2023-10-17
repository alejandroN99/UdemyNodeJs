const Role = require("../models/role");
const User = require("../models/user")

const RoleValidator = async (role = '') => {
    const existRole = await Role.findOne({role});
    if(!existRole){
        throw new Error(`El ${role} no está registrado en la DB`)
    }
}

const EmailValidator = async (correo = '') => {
    const existEmail = await User.findOne({correo});
    if(existEmail){
        throw new Error(`El ${correo} ya está registrado en la DB`)
    }
}

const UserIdValidator = async (id) => {
    const existId = await User.findById(id);
    if(!existId){
        throw new Error(`El ${id} no existe`)
    }
}


module.exports = {
    RoleValidator,
    EmailValidator,
    UserIdValidator
}