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
      type: DataTypes.FLOAT,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue : "https://picsum.photos/400/300",
    },
    
  }, { timestamps: false });
};
