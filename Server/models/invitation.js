"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Invitation.belongsTo(models.Event, {
        as: "userEvent",
        foreignKey: "eventId",
      });
    }
  }
  Invitation.init(
    {
      invitedUser: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      isActive: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
