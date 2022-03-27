require('dotenv').config();

const getPoketypes = async (req, res, next)=> {
    await res.status(200).json({hola:'Soy Get pokeTypes'});
}

module.exports = getPoketypes;