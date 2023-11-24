const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");

require('dotenv').config();

const { dbConnect } = require("../database/config.db")


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usersPath :     '/api/users',
            categoriasPath: '/api/categorias',
            authPath  :     '/api/auth',
            productoPath :  '/api/producto',
            buscarPath :    '/api/buscar',
            uploadPath :    '/api/upload',
        }
        

        //Connection db
        this.connectDb();

        this.middlewares();

        this.routes();
    }

    async connectDb(){
        await dbConnect();
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //Lectura y parseo del body
        this.app.use( express.json());

        //Contenido estatico
        this.app.use( express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('App listening in port:'+ this.port)
        })
    };

    routes(){
        this.app.use(this.paths.authPath ,require("../routes/auth.routes"));
        this.app.use(this.paths.categoriasPath ,require("../routes/categorias.routes"));
        this.app.use(this.paths.usersPath ,require("../routes/user.routes"));
        this.app.use(this.paths.productoPath ,require("../routes/productos.routes"));
        this.app.use(this.paths.buscarPath ,require("../routes/buscar.routes"));
        this.app.use(this.paths.uploadPath ,require("../routes/upload.routes"));
    }

}

module.exports = Server;