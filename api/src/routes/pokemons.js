const {Router} = require('express');
const router = Router();

const {getAllPokemons, getById, postPokemon} = require('../controllers/pokemons.js')


router.get('/', getAllPokemons);
router.get('/:id', getById);
router.post('/', postPokemon);

module.exports = router;