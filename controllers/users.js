const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
    const { q, nombre = "Nahuel", apikey, page = 1, limit } = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const postUsers = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'post API - controller',
        nombre, 
        edad
    });
}

const putUsers = (req = request, res = response) => {
    // id ES EL NOMBRE QUE PUSIMOS EN LA RUTA COMO :id
    const id = req.params.id;   
    res.json({
        msg: 'put API - controller',
        id
    });
}

const patchUsers = (req = request, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}