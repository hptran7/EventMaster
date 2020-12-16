"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Invitations", {
      fields: ["eventId"],
      type: "FOREIGN KEY",
      name: "adding-fk-to-event",
      references: {
        table: "Events",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Invitations", "adding-fk-to-event");
  },
};
