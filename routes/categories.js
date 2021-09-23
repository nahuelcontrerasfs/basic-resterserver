const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields, hasAdminRole } = require('../middlewares');
const { 
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories');
const { isValidCategory } = require('../helpers/db_validators');
const router = Router();

// OBTENER TODAS LAS CATEGORIAS - PUBLICA
router.get('/', getCategories);

// OBTENER UNA CATEGORIA POR ID - PUBLICA
router.get('/:id', [
    check('id', 'No es un id de mongoDB').isMongoId(),
    check('id').custom( isValidCategory ),
    validateFields
], getCategory);

// CREAR UNA CATEGORIA - PRIVADA, USER
router.post('/', [ 
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

// ACTUALIZAR UNA CATEGORIA POR ID - PRIVADA, USER
router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( isValidCategory ),
    validateFields
], updateCategory);

// BORRAR CATEGORIA POR ID - PRIVADA, ADMIN
router.delete('/:id', [
    validateJWT,    
    hasAdminRole,
    check('id', 'No es un id de mongoDB').isMongoId(),
    check('id').custom( isValidCategory ),
    validateFields
], deleteCategory);

module.exports = router;