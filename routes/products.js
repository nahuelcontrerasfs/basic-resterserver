const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, hasAdminRole } = require('../middlewares');
const { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products');
const { 
    isValidCategory, 
    isValidProduct 
} = require('../helpers/db_validators');
const router = Router();

// OBTENER TODAS LAS CATEGORIAS - PUBLICA
router.get('/', getProducts);

// OBTENER UNA CATEGORIA POR ID - PUBLICA
router.get('/:id', [
    check('id', 'No es un id de mongoDB').isMongoId(),
    check('id').custom( isValidProduct ),
    validateFields
], getProduct);

// CREAR UNA CATEGORIA - PRIVADA, USER
router.post('/', [ 
    validateJWT,
    check('category', 'No es un id de Mongo válido').isMongoId(),
    check('category').custom( isValidCategory ),
    validateFields
], createProduct);

// ACTUALIZAR UNA CATEGORIA POR ID - PRIVADA, USER
router.put('/:id', [
    validateJWT,
    // hasAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('category', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( isValidProduct ),
    validateFields
], updateProduct);

// BORRAR CATEGORIA POR ID - PRIVADA, ADMIN
router.delete('/:id', [
    validateJWT,    
    hasAdminRole,
    check('id', 'No es un id de mongoDB').isMongoId(),
    check('id').custom( isValidProduct ),
    validateFields
], deleteProduct);

module.exports = router;