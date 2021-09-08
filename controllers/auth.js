const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createJWT } = require('../helpers/jwt-generator');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        // VERIFICAMOS SI EXISTE
        if(!user) {
            return res.status(400).json({
                msg: 'CORREO/contraseña incorrectos'
            })
        }
        
        // VERIFICAMOS SI SE ENCUENTRA ACTIVO
        if(!user.status) {
            return res.status(400).json({
                msg: 'Usuario inactivo'
            })
        }

        // VERIFICAMOS LA CONTRASEÑA
        const validPass = bcryptjs.compareSync(password, user.password);
        if(!validPass) {
            return res.status(400).json({
                msg: 'Correo/CONTRASEÑA incorrectos'
            })
        }

        const token = await createJWT( user.id );
        res.json({
            token,
            user
        });        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}