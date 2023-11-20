const { Schema, model} = require("mongoose");


const CategoriaSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"]
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const {__v,estado, ...data} = this.toObject();
    return data;
}

module.exports = model("Categoria",CategoriaSchema);