const { Schema, model} = require("mongoose");


const ProductoSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    description: {type: String, default: ""},
    disponible: {type: Boolean, default:true},
    img: {tyoe: String}
});

ProductoSchema.methods.toJSON = function() {
    const {__v,estado, ...data} = this.toObject();
    return data;
}

module.exports = model("Producto",ProductoSchema);