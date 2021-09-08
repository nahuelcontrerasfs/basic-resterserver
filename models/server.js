// CONTINUAR VIDEO 8
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    // EN EL CONSTRUCTOR DEFINIMOS LAS PROPIEDADES
    constructor() {        
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // CONECCION A DB
        this.connectDB();

        // MIDDLEWARES
        this.middlewares();

        // RUTAS DE MI APP
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // LECTURA Y PARSEO DEL BODY
        this.app.use(express.json(0));
        // DIRECTORIO PÚBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    }
}

 

 

module.exports = Server;