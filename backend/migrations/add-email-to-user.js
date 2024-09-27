'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Check if the column already exists
        const tableInfo = await queryInterface.describeTable('Users');
        if (!tableInfo.email) {
            // Only add the column if it doesn't exist
            await queryInterface.addColumn('Users', 'email', {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            });
        }
    },

    down: async (queryInterface, Sequelize) => {
        // Remove the column if it exists
        const tableInfo = await queryInterface.describeTable('Users');
        if (tableInfo.email) {
            await queryInterface.removeColumn('Users', 'email');
        }
    }
};