const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async ( req, res, next ) => {
    
    const token = req.header('x-token');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'token faltante'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const user = await User.findById( uid );

        if(!user) {
            res.status(401).json({
                msg: 'Token inválido. UNE'
            }); 
        }
        
        if(!user.status) {
            res.status(401).json({
                msg: 'Token inválido. UEF'
            });    
        }
        req.user = user;
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token inválido'
        });

    }
}

module.exports = {
    validateJWT
}