const axios = require("axios");

const { Pokemon, Type } = require("../db");

const { Op } = require("sequelize");

const POKEMON_OBJECT = (res) => {
  return {
    id: res.data.id,
    name:
      res.data.name.charAt(0).toUpperCase() +
      res.data.name.slice(1).toLowerCase(),
    height: res.data.height / 10 + "m",
    weight: res.data.weight / 10 + "kg", 
    hp: res.data.stats[0].base_stat,
    attack: res.data.stats[1].base_stat,
    defense: res.data.stats[2].base_stat,
    speed: res.data.stats[5].base_stat,
    types: res.data.types.map(
      (type) =>
        type.type.name.charAt(0).toUpperCase() +
        type.type.name.slice(1).toLowerCase()
    ),
    back: res.data.sprites.back_default,
    front: res.data.sprites.front_default,
    image: res.data.sprites.other.home.front_default,
  };
};
const getDataBD = async () => {
  try {
    const dbPokemons = await Pokemon.findAll({
      include: [
        {
          model: Type,
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
        height: pokemon.height + 'm',
        weight: pokemon.weight + 'kg',
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
    return apiPokemons;

  } catch (error) {
    console.log(error)
  }
};

const getAll = async (req, res, next) => {
  try {
    const apiPokemons = await getApiData();
    const dbPokemons = await getDataBD();
    const results = [...apiPokemons, ...dbPokemons];

    results? res.status(200).json( results) : res.status(404).json({Message : 'Bad Request no results to Show'})
  } catch (error) {
    next(error);
  }
};

const getAllPokemons = async (req, res, next) => {
  let results = [];
  let page;
  page = req.query.page ? req.query.page : 1;

  const toShow = 12;
  const start = (page - 1) * toShow;
  const end = page * toShow;

  const { name, origin } = req.query;
  try {
    if (name && name !== "") {
      results = await getByName(name);
      
      results === undefined
        ? res.status(404).json("Not found")
        : res.status(200).json({ paginatedPokemons: [results] });

    } else if (
      (origin && origin?.toLowerCase() === "db") ||
      origin?.toLowerCase() === "api"
    ) {
      results = await filterByOrigin(origin);
      let totalPages = Math.ceil(results.length / toShow);
      let paginatedPokemons = results?.slice(start, end);

      if (page > totalPages) {
        res.status(404).json("Not found");
      }
      if (results.length === 0) {
        res.status(404).json("Not found");
      }
    
      res.status(200).json({ paginatedPokemons, results: results.length });
    } else {
      const apiPokemons = await getApiData();
      const dbPokemons = await getDataBD();
      const results = [...apiPokemons, ...dbPokemons];
      let totalPages = Math.ceil(results.length / toShow);

      let paginatedPokemons = results?.slice(start, end);
 
      if (page > totalPages) {
        res.status(404).json("Not found");
      }
      if (results.length === 0) {
        res.status(404).json("Not found");
      }
      res.status(200).json({ paginatedPokemons, results: results.length });
    }
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

      selection.data ? res.status(200).json(POKEMON_OBJECT(selection)) : null;
    } else if ((/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))) {
      const search = await Pokemon.findByPk(id, { include: [Type] });
      if(search === null){
        res.status(404).json("Invalid ID" );
      }else{
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
      } 
      }
      res.status(404).json("Invalid ID");
    }
  catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }
  }
};

const getByName = async (name) => {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  try {
    const searchDB = await Pokemon.findOne(
      {
        where: {
          name: {
            [Op.like]: name.trim().toLowerCase(),
          },
        },
      },
      { include: [{ model: Type, atributes: ["name"] }] }
    );
    if (searchDB === null) {
      const searchAPI = await axios(url + name.trim().toLowerCase());

      if (searchAPI.data) {

        return POKEMON_OBJECT(searchAPI);
      } else {
        return undefined;
      }
    } else if (searchDB.dataValues?.name) {
      return {
        id: searchDB.dataValues.id,
        name: searchDB.dataValues.name,
        height: searchDB.dataValues.height + "m",
        weight: searchDB.dataValues.weight + "kg",
        hp: searchDB.dataValues.hp,
        defense: searchDB.dataValues.defense,
        attack: searchDB.dataValues.attack,
        speed: searchDB.dataValues.speed,
        types: searchDB.dataValues.types?.map((type) => type.name),
        image: searchDB.dataValues.image,
      };
    } else {
      return undefined;
    }

    
  } catch (error) {
    console.log(error);
  }
};

const filterByOrigin = async (origin) => {
  if (origin.toLowerCase() === "db") {
    return await getDataBD();
  } else if (origin.toLowerCase() === "api") {
    return await getApiData();
  } else {
    return;
  }
};

const postPokemon = async (req, res, next) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }

    let exist = await Pokemon.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (exist) {
      return res.status(400).json({ message: "Pokemon already exist" });
    }

    let newPokemon = await Pokemon.create({
      name: name.trim().toLowerCase(),
      hp: hp || Math.floor(Math.random() * 150) + 1,
      attack: attack || Math.floor(Math.random() * 150) + 1,
      defense: defense || Math.floor(Math.random() * 150) + 1,
      speed: speed || Math.floor(Math.random() * 150) + 1,
      height: height  || Math.floor((Math.random() * 3)+0.01).toFixed(1),
      weight: weight || Math.floor((Math.random() * 150)+0.1).toFixed(1) ,
      image,
      types: types || [],
    });
    if (types?.length) {
      let typeDb = await Type.findAll({
        where: { name: types },
      });

      newPokemon.addType(typeDb);
    }
    res.status(201).send("Pokemon created!");
  } catch (err) {
    next(err);
  }
};

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
      console.log("Pokemon deleted");
    } else {
      res.status(404).json({ message: "Pokemon not found" });
      console.log("Pokemon deleted");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllPokemons,
  getById,
  postPokemon,
  deletePokemon,
  editPokemon,
  getAll
};
