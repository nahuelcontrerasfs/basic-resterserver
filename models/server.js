// CONTINUAR VIDEO 8
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    
    // EN EL CONSTRUCTOR DEFINIMOS LAS PROPIEDADES
    constructor() {        
        this.app    = express();
        this.port   = process.env.PORT;        
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads',
            users:      '/api/users',
        }

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
        // FILEUPLOAD
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        });
    }
}

module.exports = Server;