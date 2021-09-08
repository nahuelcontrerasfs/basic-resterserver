const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validateFields, 
    validateJWT, 
    hasAdminRole, 
    hasRole
} = require('../middlewares');

const { 
    isValidRole, 
    isValidEmail, 
    isValidUser 
} = require('../helpers/db_validators');

const { 
    getUsers, 
    putUsers, 
    postUsers,
    deleteUsers,
    patchUsers 
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers );

router.put('/:id', [
    check('id', 'No es un ID válido de MONGODB').isMongoId(),
    check('id').custom( isValidUser ),
    check('role').custom( isValidRole ),
    validateFields
], putUsers);

router.post('/', [
    check('name', 'Name must not be empty').not().isEmpty(),
    check('lastname', 'Lastname must not be empty').not().isEmpty(),
    check('password', 'Password must have at least 6 letters').isLength({ min: 6}),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( isValidEmail ),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], postUsers);

router.patch('/', patchUsers);

router.delete('/:id', [
    validateJWT,
    // hasAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido de MONGODB').isMongoId(),
    check('id').custom( isValidUser ),
    validateFields
],deleteUsers);

module.exports = router;  