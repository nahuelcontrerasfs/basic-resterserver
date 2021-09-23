const { 
    Category,
    Product, 
    Role, 
    User 
} = require('../models');

const isValidCategory = async ( id ) => {
    const categoryExists = await Category.findById( id );
    if(!categoryExists) {
        throw new Error(`No existe el id ${id}`);
    }
}

const isValidEmail = async ( email = '') => {
    const emailExists = await User.findOne({ email });
    if(emailExists) {
        throw new Error(`Ya existe un usuario registrado con el correo ${email}`);
    }
}

const isValidProduct = async ( id ) => {
    const productExists = await Product.findById( id );
    if(!productExists) {
        throw new Error(`No existe el id ${id}`);
    }
}

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if(!roleExists) {
        throw new Error(`El rol ${role} no se encuentra registrado en la base de datos`);
    }
}

const isValidUser = async ( id ) => {
    const userExists = await User.findById( id );
    if(!userExists) {
        throw new Error(`No existe el id ${id}`);
    }
}

module.exports = {
    isValidCategory,
    isValidEmail,
    isValidProduct,
    isValidRole,
    isValidUser
}