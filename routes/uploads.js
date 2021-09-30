const { Router } = require('express');
const { check } = require('express-validator');
const { 
    uploadImage,
    updateImage,
    updateImageCloudinary,
    showImage
} = require('../controllers/uploads');

const { 
    validateFields,
    validateFile
} = require('../middlewares/');
const { isValidCollection } = require('../helpers');

const router = Router();

router.post('/', validateFile, uploadImage);

router.put('/:searchCollection/:id', [
    validateFile,
    check('id', 'Debe ser un MONGOID válido').isMongoId(),
    check('searchCollection').custom( col => isValidCollection( col, [ 'users', 'products' ] ) ),
    validateFields
// ], updateImage);
], updateImageCloudinary);

router.get('/:searchCollection/:id', [
    check('id', 'Debe ser un MONGOID válido').isMongoId(),
    check('searchCollection').custom( col => isValidCollection( col, [ 'users', 'products' ] ) ),
    validateFields
], showImage);

module.exports = router;