"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("UserEvents", {
      fields: ["eventId"],
      type: "FOREIGN KEY",
      name: "adding-fk-to-eventid",
      references: {
        table: "Events",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "UserEvents",
      "adding-fk-to-eventid"
    );
  },
};
