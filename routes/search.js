const { Router } = require('express');
const { search } = require('../controllers/search');
const router = Router();

router.get('/:searchCollection/:searchTerm', search )

module.exports = router;