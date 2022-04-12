const { DataTypes } = require("sequelize");


require("dotenv").config();

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
      
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.FLOAT,

    },
    weight: {
      type: DataTypes.FLOAT ,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aGihiAJdXHQUE3L2c6O9IgHaHa%26pid%3DApi&f=1",
    },
    
  }, { timestamps: false });
};
