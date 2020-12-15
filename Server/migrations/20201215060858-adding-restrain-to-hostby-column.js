"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Events", {
      fields: ["hostBy"],
      type: "FOREIGN KEY",
      name: "adding-fk-to-hostBy",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Events", "adding-fk-to-hostBy");
  },
};
