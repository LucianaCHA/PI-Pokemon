const {Router} = require('express');
const router = Router();

const getPoketypes = require('../controllers/types')
router.get('/', getPoketypes);

module.exports = router;