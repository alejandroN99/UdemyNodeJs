const express = require('express');
const cors = require('cors');

require('dotenv').config();


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('App listening in port:'+ this.port)
        })
    };

    routes(){
        this.app.use(this.usersPath ,require("../routes/user.routes") )
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