'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Ensure queryInterface and Sequelize are defined
        if (!queryInterface || !Sequelize) {
            throw new Error('queryInterface or Sequelize is undefined');
        }

        // Add your migration logic here
        return queryInterface.addColumn('Users', 'email', {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Ensure queryInterface and Sequelize are defined
        if (!queryInterface || !Sequelize) {
            throw new Error('queryInterface or Sequelize is undefined');
        }

        // Add your rollback logic here
        return queryInterface.removeColumn('Users', 'email');
    }
};