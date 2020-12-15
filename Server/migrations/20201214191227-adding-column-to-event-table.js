"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Events", "covidStatus", Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Events", "covidStatus");
  },
};
