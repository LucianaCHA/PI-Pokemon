const {Router} = require('express');
const router = Router();

const getPoketypes = require('../controllers/poketypes')
router.get('/', getPoketypes);

module.exports = router;