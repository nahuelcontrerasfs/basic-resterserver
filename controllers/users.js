const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) => {
    
    // ARGUMENTOS OPCIONALES QUE VIENEN POR LA QUERY
    const { limit = 5, from = 0 } = req.query;
    // ASIGNAMOS UNA CONSTANTE query PARA FILTRA ÚNICAMENTE POR LOS USUARIOS DE status: true
    const query = { status: true };
    
    const [ users, total] = await Promise.all([
        User.find( query )
            .skip(Number(from))
            .limit(Number(limit)),
        User.countDocuments( query )
    ]);
    res.json({
        users,
        total
    });
}

const postUsers = async (req, res) => {
        
    const { name, email, password, role } = req.body;    
    
    const user = new User({
        name, 
        email,
        password,
        role
    });
    

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();

    res.status(201).json({
        user
    });    

}

const putUsers = async (req, res) => {
    // id ES EL NOMBRE QUE PUSIMOS EN LA RUTA COMO :id
    const { id } = req.params;   
    const { _id, password, google, email, ...restInfo } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        restInfo.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, restInfo);

    res.json({
        user
    });
}

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const deleteUsers = async (req, res) => {
    const { id } = req.params
    // ELIMINACIÓN FÍSICA
    // const user = await User.findByIdAndDelete( id );
    const user = await User.findByIdAndUpdate( id, {
        status: false
    });
    
    res.json({
        user
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}