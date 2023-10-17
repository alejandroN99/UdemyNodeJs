const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CNN);
        console.log('Database online')
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos");
    }
}

module.exports = {
    dbConnect
}