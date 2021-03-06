const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoute = require('./pokemons.js');
const pokeTypesRoute = require('./poketypes.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRoute);
router.use('/types', pokeTypesRoute);

module.exports = router;
