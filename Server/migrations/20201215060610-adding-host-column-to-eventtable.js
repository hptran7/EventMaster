"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Events", "hostBy", Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Events", "hostBy");
  },
};
