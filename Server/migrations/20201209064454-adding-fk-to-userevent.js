"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("UserEvents", {
      fields: ["userId"],
      type: "FOREIGN KEY",
      name: "adding-fk-to-userId",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("UserEvents", "adding-fk-to-userId");
  },
};
