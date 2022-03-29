const axios = require("axios");

const { Pokemon, Type } = require("../db");

const {Op} = require('sequelize');

const POKEMON_OBJECT = (res) => {
  return {
    id: res.data.id,
    Name: res.data.name,
    Height: res.data.height / 10 + "m",
    Weight: res.data.weight / 10 + "kg",
    HP: res.data.stats[0].base_stat,
    Attack: res.data.stats[1].base_stat,
    Defense: res.data.stats[2].base_stat,
    Speed: res.data.stats[5].base_stat,
    Types: res.data.types.map((type) => type.type.name),
    back: res.data.sprites.back_default,
    front: res.data.sprites.front_default,
    Art: res.data.sprites.other["official-artwork"].front_default,
  };
};
const getDataBD = async () => {
  try {
    const dbPokemons = await Pokemon.findAll({
      include: [
        {
          model: PokemonType,
          atributes: ["name"],
          through: {
            atributes: ["id"],
          },
        },
      ],
    });

    return dbPokemons.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        hp: pokemon.hp,
        defense: pokemon.defense,
        attack: pokemon.attack,
        speed: pokemon.speed,
        image: pokemon.image,
        types: pokemon.types?.map((type) => type.name),
      };
    });
  } catch (error) {
    console.log(error);
  }
};

const getApiData = async () => {
  try {
    const url = "https://pokeapi.co/api/v2/pokemon";
    // let res1 = await axios.get(url)
    // let res2 = await axios.get(res1.data.next)
    // console.log('First call + url', res1.data.results)
    // console.log('2nd call + url', res2.data.results)

    // let apiPokemons=  res1.data.results.concat(res2.data.results);
    let toCall = [];
    for (let i = 1; i < 41; i++) {
      toCall.push(url + "/" + i);
    }
    console.log(toCall, "es toCall"); //aca tengo las 40 urls para llamar
    let apiPokemons = Promise.all(
      toCall.map(async (url) => {
        let res = await axios.get(url);
        return POKEMON_OBJECT(res);
      })
    );
    console.log("promise all y map", apiPokemons);
    return apiPokemons;
    // let apiPokemons = await Promise.all(toCall)
    // console.log('todos los pokemons', apiPokemons)
    // apiPokemons = apiPokemons.map(res=>res.data)
    // console.log(apiPokemons)
    // return apiPokemons.flat();
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

const getAllPokemons = async (req, res, next) => {
  try {
    const apiPokemons = await getApiData();
    const dbPokemons = await getDataBD();
    const allPokemons = [...apiPokemons, ...(dbPokemons ? dbPokemons : [])];

    console.log("apiPokemons", apiPokemons, "y db Pokemosn", dbPokemons);

    allPokemons
      ? res.status(200).json(allPokemons)
      : res.status(404).json({ message: "No pokémons to show" });
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id && !isNaN(id)) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const selection = await axios(url);
      console.log("ID", selection.data);

      selection.data ? res.status(200).json(POKEMON_OBJECT(selection)) : null;
    } else {
      const search = await Pokemon.findByPk(id, { include: [Type] });
      if (search) {
        const selection = {
          id: search.id,
          name: search.name,
          height: search.height,
          weight: search.weight,
          hp: search.hp,
          defense: search.defense,
          attack: search.attack,
          speed: search.speed,
          image: search.image,
          types: search.types?.map((type) => type.name),
          image: search.image,
        };
        res.status(200).json(selection);
      } else {
        res.status(404).json({ Sorry: "Invalid ID" });
      }
    }
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }
    console.log(error);
  }
};

//magen, nombre y tipos, id , vida, fuerza, defensa, velocidad, h and peso
const postPokemon = async (req, res, next) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;
if(!name){
  res.status(400).json({message: 'Name is required'})
}

let exist = await Pokemon.findOne({
  where: {
    name: {
      [Op.iLike]: name,
    }
  }
})
console.log(exist, 'exist?')
console.log('req', req.body.name.trim().charAt(0).toUpperCase() + name.trim().toLowerCase().slice(1))
if (exist){
  return res.status(400).json({message: 'Pokemon already exist'})

}

let newPokemon = await Pokemon.create({
  name: name.trim().charAt(0).toUpperCase() + name.trim().slice(1),
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  image, 
  types
  });
if(types?.length){
let typeDb = await Type.findAll({
  where: { name: types },
});

newPokemon.addType(typeDb);
}
res.status(201).send('Pokemon created!');
} catch (err) {
next(err);
}
}

const editPokemon = async (req, res, next) => {
  const { id } = req.params;
  const info = req.body;

  try {
    const pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
      await pokemon.update(info);
      res.status(200).json({ message: "Pokemon updated", pokemon });
    } else {
      res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deletePokemon = async (req, res, next) => {
  const { id } = req.params;

  try {
    const toDelete = await Pokemon.findByPk(id);
    if (toDelete) {
      await toDelete.destroy();
      res.status(200).json({ message: "Pokemon deleted" });
    } else {
      res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllPokemons, getById, postPokemon, deletePokemon, editPokemon };
