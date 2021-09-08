const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if(!roleExists) {
        throw new Error(`El rol ${role} no se encuentra registrado en la base de datos`);
    }
}

const isValidEmail = async ( email = '') => {
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        throw new Error(`Ya existe un usuario registrado con el correo ${email}`);
    }
}

const isValidUser = async ( id ) => {
    const userExists = await User.findById( id );
    if(!userExists) {
        throw new Error(`No existe el id ${id}`);
    }
}

module.exports = {
    isValidRole,
    isValidEmail,
    isValidUser
}