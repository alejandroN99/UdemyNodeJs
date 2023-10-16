const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, "El nombre es obligatorio"]
    }, 
    correo:{
        type: String,
        required: [true, "El correo es obligatorio"]
    },
    password:{
        type: String,
        required: [true, "El password es obligatorio"]
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario;
}
module.exports = model('User', UserSchema);