const axios= require ('axios')

const getAllPokemons = async (req, res, next)=>{

}
const getById = async (req, res, next)=>{
    

    await res.status(200).json({'hola soy el id': req.params.id});
}

const postPokemon = async (req, res, next)=>{

    const {name, id, power} = req.body
    await res.status(200).json({name : name, id: id, power: power});
}


module.exports = {getAllPokemons, getById, postPokemon}