const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { dbConnect } = require("../database/config.db")


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //Connection db
        this.connectDb();

        this.middlewares();
        this.routes();
    }

    async connectDb(){
        await dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('App listening in port:'+ this.port)
        })
    };

    routes(){
        this.app.use(this.authPath ,require("../routes/auth.routes"));
        this.app.use(this.usersPath ,require("../routes/user.routes"));
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //Lectura y parseo del body
        this.app.use( express.json());

        //Contenido estatico
        this.app.use( express.static('public'))

    }
}

module.exports = Server;