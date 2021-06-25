const { Router } = require('express');
const router = Router();
const { 
    getUsers, 
    putUsers, 
    postUsers,
    deleteUsers,
    patchUsers 
} = require('../controllers/users');

router.get('/', getUsers );
router.post('/', postUsers);
router.put('/:id', putUsers);
router.patch('/', patchUsers);
router.delete('/', deleteUsers);

module.exports = router;

