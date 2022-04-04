const {Router} = require('express');
const router = Router();

const {getAllPokemons, getById, postPokemon, deletePokemon, editPokemon, getAll} = require('../controllers/pokemons.js')


router.get('/', getAllPokemons);
router.get('/allPokemons', getAll)
router.get('/:id', getById);
router.post('/', postPokemon);
router.delete('/:id', deletePokemon);
router.put('/:id', editPokemon);

module.exports = router;