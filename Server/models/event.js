"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      location: DataTypes.STRING,
      postcode: DataTypes.INTEGER,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      address: DataTypes.STRING,
      covidStatus: DataTypes.INTEGER,
      isupdated: DataTypes.INTEGER,
      hostBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
