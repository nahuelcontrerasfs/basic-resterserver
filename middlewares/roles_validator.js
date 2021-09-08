
const hasAdminRole = ( req, res, next ) => {

    if( !req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar primero el token'
        });
    }

    const { role, name } = req.user;
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Acción inválida. ${ name } no es administrador`
        });
    }
    next();
}

const hasRole = ( ...roles ) => {
    return (req, res, next) => {
        
        if( !req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero el token'
            });
        }

        if(!roles.includes( req.user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    hasAdminRole,
    hasRole
}